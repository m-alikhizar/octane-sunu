import { Component, OnInit, Input } from '@angular/core';
import { VotingService } from '../../services/services';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})

export class VoteComponent implements OnInit {

  public voting: boolean;
  public tokens: string;
  public proposal: string;
  public receipt: any;
  public candidates: any;

  @Input() account;

  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.candidates = [];

    this.votingService.getCandidates().subscribe(
      (result) => {
        this.candidates = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onVoteClick = () => {
    if (!this.proposal || this.voting) {
      return;
    }
    if (!parseInt(this.tokens, 10)) {
      return;
    }

    this.voting = true;

    this.votingService.vote(this.proposal, parseInt(this.tokens, 10), this.account).subscribe(
      (receipt) => {

        receipt.keys = Object.keys(receipt);
        this.receipt = receipt;
        this.voting = false;

      },
      (error) => {
        this.voting = false;
        console.log(error);
      }
    );
  }

  onCandidateClick = (index) => {
    this.proposal = this.candidates[index];
  }

}
