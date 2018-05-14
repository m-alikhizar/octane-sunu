import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Web3Service } from '../../services/services';
import { Observable } from 'rxjs/Observable';
import { AccountItem } from '../models';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {

  public accounts: Observable<AccountItem[]>;

  public acc: any;

  constructor(private web3Service: Web3Service, private ref: ApplicationRef) { }

  ngOnInit() {

    this.accounts = this.web3Service.getAccounts().do(() => {
        // https://github.com/brave/browser-laptop/issues/13711
        setTimeout(() => {
            this.ref.tick();
        }, 0);
    });
  }
}
