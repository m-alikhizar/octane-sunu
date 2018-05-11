import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../services/services';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public stats: any;
  public proposal: string;

  constructor(private votingService: VotingService) { }

  ngOnInit() {

    this.votingService.stats().subscribe((result) => {
      this.stats = result;
    });

    this.votingService.proposal().subscribe(
      (result) => {
        this.proposal = result;
      },
      (error) => { }
    );

  }

}
