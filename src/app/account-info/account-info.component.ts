import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../services/services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})

export class AccountInfoComponent implements OnInit {

  public userInfo: any;
  private routeSub: any;
  public account: string;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private votingService: VotingService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.account = params.account;
    })

    this.onReady();
  }

  onReady = () => {

    this.userInfo = {};

    this.subscription = this.votingService.getUserInfo(this.account).subscribe(
      (result) => {
        this.userInfo = {...this.userInfo, ...result};
      },
      (error) => { }
    );
  }

}
