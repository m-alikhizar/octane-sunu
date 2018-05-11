import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTokensComponent } from './buy-tokens.component';
import Pipes from '../pipes'

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VotingService, Web3Service } from '../../services/services';
import { TokensInfo } from '../models';

import { FormsModule } from '@angular/forms';


describe('BuyTokensComponent', () => {
  let component: BuyTokensComponent;
  let fixture: ComponentFixture<BuyTokensComponent>;
  let contract: VotingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientModule, FormsModule ],
      declarations: [ BuyTokensComponent, Pipes ],
      providers: [ VotingService, Web3Service ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTokensComponent);
    component = fixture.componentInstance;
    contract = TestBed.get(VotingService);

    console.log('.');

  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });

  it('should return Observable from getTokensInfo and reflect in view', () => {

    const expected = new TokensInfo([1, 1]);

    spyOn(contract, 'getTokensInfo').and.returnValue(Observable.create(observer => {
      observer.next([expected]);
      observer.complete();
    }));

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.available'));

    expect(el.nativeElement.textContent.trim()).toEqual(expected.available.toString());

  });

});
