import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compose-in',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})

export class ComposeComponent implements OnInit {

  @Input() account;

  public state: number;
  public STATES: any;

  constructor() { }

  ngOnInit() {

    this.STATES = { VOTE: 1, DELEGATE: 2 }

    this.state = this.STATES.VOTE;
  }

  getAccount = () => {
    return this.account;
  }

  onDelegateOptClick = () => {
    this.state = this.STATES.DELEGATE;
  }

  onVoteOptClick = () => {
    this.state = this.STATES.VOTE;
  }
}
