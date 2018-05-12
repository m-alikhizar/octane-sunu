import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Web3Service } from './web3.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { TokensInfo, AccountInfo } from '../app/models';

const json = require('../assets/data/Voting.json')

const contract = require('truffle-contract');

@Injectable()
export class VotingService {

  private voting: any;
  private subject = new Subject<any>();

  public abi: any;

  public tokenPrice: number;

  constructor(private web3Service: Web3Service) { }

  public loadABI(): Observable<any> {
    return Observable.create(async observer => {
      this.voting = contract(json);
      this.voting.setProvider(this.web3Service.web3.currentProvider);

      this.abi = await this.voting.deployed();

      observer.next({loaded: true});
      observer.complete();
    })
  }

  getUserInfo(account: string): Observable<AccountInfo> {
    const web3 = this.web3Service.web3;

    (async function() {

      try {
        if (this.abi) {

          const data = await this.abi.voterDetails.call(account)

          this.subject.next(new AccountInfo(data));
        }

      } catch (error) {
        this.subject.observers.map(obs => obs.error(`Error fetching account info`));
      }
    }).bind(this)();

    return this.subject.asObservable();
  }

  getCandidates(): Observable<any> {
    const web3 = this.web3Service.web3;

    return Observable.create(async (observer) => {

      try {

        if (this.abi) {
          const candidates = await this.abi.allCandidates.call();

          observer.next(candidates.map(c => web3.toUtf8(c)));
          observer.complete();

        }

      } catch ( error ) {
        observer.error(error);
      }

    })
  }

  buyTokens(tokens, account): Observable<any> {

    const web3 = this.web3Service.web3;

    const price = tokens * this.tokenPrice;

    return Observable.create(async (observer) => {

      const payload = { value: web3.toWei(price, 'ether'), from: account };

      const response = await this.abi.buy(payload);

      observer.next( response.receipt );
      observer.complete();

      this.getUserInfo(account);

    });
  }

  getTokensInfo(): Observable<TokensInfo> {
    const web3 = this.web3Service.web3;

    return Observable.create(async (observer) => {

      try {

        if (this.abi) {
          const data = await this.abi.getTokensInfo();

          const info = new TokensInfo(data);

          this.tokenPrice = web3.fromWei(info.price);

          observer.next( [ info ] );
          observer.complete();

        }

      } catch (error) {

        observer.error(error);

      }

    });
  }

  vote(proposal, tokens, account): Observable<any> {

    return Observable.create(async (observer) => {

      try {
        const response = await this.abi.vote(proposal, tokens, {gas: 140000, from: account});

        observer.next(response.receipt);
        observer.complete();

      } catch (err) {
        observer.error(err);
      }

      this.getUserInfo(account);

    });
  }

  delegate(delegateAccount, tokens, account): Observable<any> {

    return Observable.create(async (observer) => {

      try {
        const response = await this.abi.delegate(delegateAccount, tokens, {gas: 140000, from: account});

        observer.next(response.receipt);
        observer.complete();

      } catch (error) {

        observer.error(error);

      }

      this.getUserInfo(account);

    });
  }

  stats(): Observable<any> {
    const web3 = this.web3Service.web3;

    return Observable.create(async (observer) => {

      try {

        if (this.abi) {
          const candidates = await this.abi.allCandidates.call();

          const result = [];

          for (const c of candidates) {
            const candidate = web3.toUtf8(c);

            const votes = await this.abi.totalVotesFor.call(candidate);

            result.push({ 'proposal': candidate, 'voteCount': votes.toString() });
          }

          observer.next(result);
          observer.complete();
        }

      } catch (error) {
        observer.error(error);
      }

    });
  }

  proposal(): Observable<any> {
    const web3 = this.web3Service.web3;

    return Observable.create(async (observer) => {

      try {

        if (this.abi) {
          const response = await this.abi.winningProposal.call()

          observer.next(web3.toUtf8(response));
          observer.complete();
        }

      } catch (error) {

        observer.error(error);

      }

    })
  }
}






