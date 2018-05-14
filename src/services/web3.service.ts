import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { AccountItem } from '../app/models';

const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {

  public web3: any;

  constructor() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)

    if (typeof window.web3 !== 'undefined') {

      /* Using web3 detected from external source. */

      this.web3 = new Web3(window.web3.currentProvider);

    } else {
      /* No web3 detected. Falling back to 'environment.HttpProvider'.
      Should remove this fallback when you deploy live, as it's inherently insecure.

      FALLBACK - use fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      */

      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.HttpProvider));

    }
  }

  getAccounts(): Observable<AccountItem[]> {
    return Observable.create(observer => {

      this.web3.eth.getAccounts((error, accounts) => {

        if (error != null) {
          observer.error(`There was an error fetching accounts.`);
        }

        if (accounts.length === 0) {
          observer.error(`Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`);
        }

        observer.next(accounts.map(account => new AccountItem(account)));
        observer.complete();
      });
    });
  };
}
