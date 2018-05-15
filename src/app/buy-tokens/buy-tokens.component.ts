import { Component, OnInit, Input } from '@angular/core';
import { VotingService } from '../../services/services';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { TokensInfo } from '../models';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.css']
})
export class BuyTokensComponent implements OnInit {

  @Input() account;

  public tokensInfo: Observable<TokensInfo>;
  public tokens: number;
  public pending: boolean;

  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.onReady();
  }

  onReady = () => {
    this.tokensInfo = this.votingService.getTokensInfo();
  }

  buyTokens = () => {

    this.pending = true;

    const receipt = this.votingService.buyTokens(this.tokens, this.account)
    .pipe(
      tap(() => {
        this.tokens = 0;
        this.pending = false;
        this.tokensInfo = this.votingService.getTokensInfo();
      })
    ).subscribe();
  }
}
