import { Component, OnInit, Input } from '@angular/core';
import { VotingService } from '../../services/services';

@Component({
  selector: 'app-delegate-vote',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})

export class DelegateComponent implements OnInit {

  @Input() account;

  public delegating: boolean;
  public delegateAddress: string;
  public tokens: string;
  public receipt: any;

  constructor(private votingService: VotingService) { }

  ngOnInit() { }

  getAccount = () => {
    return this.account;
  }

  onDelegateClick = () => {
    if (!this.delegateAddress || this.delegating) {
      return;
    }
    if (!parseInt(this.tokens, 10)) {
      return;
    }

    this.delegating = true;

    this.votingService.delegate(this.delegateAddress, parseInt(this.tokens, 10), this.account).subscribe(
      (receipt) => {
        receipt.keys = Object.keys(receipt);
        this.receipt = receipt;

        this.delegating = false;
      },
      (error) => {
        this.delegating = false;

        console.log(error)
      }
    );
  }
}
