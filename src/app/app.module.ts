import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import {Web3Service, VotingService} from '../services/services';
import Pipes from './pipes';

import { AppRoutingModule } from './app.routing';
import { AccountInfoComponent } from './account-info/account-info.component';
import { MainComponent } from './main/main.component';
import { StatsComponent } from './stats/stats.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BuyTokensComponent } from './buy-tokens/buy-tokens.component';
import { ComposeComponent } from './compose/compose.component';
import { VoteComponent } from './vote/vote.component';
import { DelegateComponent } from './delegate/delegate.component';
import { RadioInputComponent } from './radio-input/radio-input.component'

const SERVICES = [
  Web3Service,
  VotingService
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AccountInfoComponent,
    MainComponent,
    StatsComponent,
    AccountsComponent,
    BuyTokensComponent,
    ComposeComponent,
    VoteComponent,
    DelegateComponent,
    RadioInputComponent,
    Pipes
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
