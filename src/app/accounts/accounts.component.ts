import { Component, OnInit } from '@angular/core';
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

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.accounts = this.web3Service.getAccounts();
  }
}
