import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { StatsComponent } from './stats/stats.component';
import { AccountsComponent } from './accounts/accounts.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AccountsComponent,
  },
  {
    path: 'home',
    component: AccountsComponent,
  },
  {
    path: 'home/:account',
    component: MainComponent,
  },
  {
    path: 'stats',
    component: StatsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
