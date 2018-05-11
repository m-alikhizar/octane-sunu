import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private routeSub: any;
  public account: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.account = params.account;
    });
  }

  getAccount() {
    return this.account;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
