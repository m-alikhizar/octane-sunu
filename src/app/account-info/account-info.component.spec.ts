import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountInfoComponent } from './account-info.component';
import Pipes from '../pipes'

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VotingService, Web3Service } from '../../services/services';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;
  let route: ActivatedRoute;
  let contract: VotingService;

  class MockActivatedRoute {
    get params() {
      return Observable.create(observer => {
        observer.next({'account': 'test'});
        observer.complete();
      })
    }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientModule ],
      declarations: [ AccountInfoComponent, Pipes ],
      providers: [ VotingService, Web3Service,
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;

    route = TestBed.get(ActivatedRoute);
    contract = TestBed.get(VotingService);

    console.log('.');

  });

  it('should be created', () => {

    fixture.detectChanges();
    expect(component).toBeTruthy();

  });

  it('route should be detected and reflected in address field', () => {

    const el = fixture.debugElement.query(By.css('.address'));

    expect(el.nativeElement.textContent.trim()).toEqual('');

    const expected = 'test';

    fixture.detectChanges();

    expect(el.nativeElement.textContent.trim()).toEqual(expected);

  });

  it('account-info should be detected and receive an Observable', () => {

    const expected = { tokens: 1 };

    const el = fixture.debugElement.query(By.css('.tokens'));

    spyOn(contract, 'getUserInfo').and.returnValue(Observable.create(observer => {
      observer.next(expected);
      observer.complete();
    }));

    fixture.detectChanges();

    expect(el.nativeElement.textContent.trim()).toEqual(expected.tokens.toString());

  });
});
