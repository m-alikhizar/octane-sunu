import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Web3Service } from './web3.service';
import { AccountInfo, TokensInfo } from '../app/models';

import { VotingService } from './voting.service';

describe('VotingService', () => {

  let service: VotingService;
  let web3Service: Web3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingService, Web3Service],
      imports: [HttpClientModule]
    });

    service = TestBed.get(VotingService);
    web3Service = TestBed.get(Web3Service);

  });

  it('should be created', inject([VotingService], (_service: VotingService) => {
    expect(_service).toBeTruthy();
  }));

  it('should set loaded to true after loading ABI', (done: DoneFn) => {

    const exprected = {loaded: true};

    service.loadABI().subscribe((status) => {
      expect(status).toEqual(exprected);

      done();
    });

  });


  it('should get accountinfo from abi to match <AccountInfo> type', (done: DoneFn) => {

    // [0] => tokens, [1] => proposal, [2] => voted, [3] => delegate
    const mockData = [1, '', true, 'foo'];

    service.abi = { voterDetails: () => Promise.resolve(mockData) }

    const expected = new AccountInfo(mockData);

    service.getUserInfo('1').subscribe((result) => {

      expect(result).toEqual(expected);

      done();

    });

  });

  it('should get candidates from abi to match UTF-8 value', (done: DoneFn) => {

    const web3 = web3Service.web3;
    const mockData = ['foo'];

    service.abi = { allCandidates: () => Promise.resolve(mockData) }

    const expected = mockData.map(m => web3.toUtf8(m));

    service.getCandidates().subscribe((result) => {

      expect(result).toEqual(expected);

      done();

    });

  });


  it('should buy tokens in ethers with abi and returns receipt', (done: DoneFn) => {

    const web3 = web3Service.web3;
    const mockData = {receipt: { test: 1 }};

    service.abi = { buy: () => Promise.resolve(mockData) }
    service.tokenPrice = 1;

    const expected = mockData.receipt;

    service.buyTokens(10, 'foo').subscribe((result) => {

      expect(result).toEqual(expected);

      done();

    });

  });


  it('should get tokens info to match type <TokensInfo>', (done: DoneFn) => {

    const web3 = web3Service.web3;

    // [0] => total, [1] => available, [2] => price
    const mockData = [1, 1, 1];

    service.abi = { getTokensInfo: () => Promise.resolve(mockData) }

    const info = new TokensInfo(mockData);
    const expected = info;

    service.getTokensInfo().subscribe((result) => {

      expect(result).toContain(expected);

      done();

    });

  });

  it('should vote in tokens tokens into account with proposal', (done: DoneFn) => {

    const web3 = web3Service.web3;

    const mockData = {receipt: { foo: 'bar' }};

    service.abi = { vote: () => Promise.resolve(mockData) }

    const expected = mockData.receipt;

    service.vote('foo', 1, 'bar').subscribe((result) => {

      expect(result).toEqual(expected);

      done();

    });

  });

  it('should delegate in tokens tokens into account without proposal', (done: DoneFn) => {

    const web3 = web3Service.web3;

    const mockData = {receipt: { foo: 'bar' }};

    service.abi = { delegate: () => Promise.resolve(mockData) }

    const expected = mockData.receipt;

    service.delegate('foo', 1, 'bar').subscribe((result) => {

      expect(result).toEqual(expected);

      done();

    });

  });

});

