import { Component, OnInit } from '@angular/core';
import { VotingService } from '../services/services';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  public loaded: boolean;

  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.votingService.loadABI().subscribe(() => {
      this.loaded = true;
    }, () => {
      console.warn('Contract abi not loaded');
    });
  }
}
