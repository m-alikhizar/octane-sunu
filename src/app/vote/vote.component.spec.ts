import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { VoteComponent } from './vote.component';
import { VotingService, Web3Service } from '../../services/services';

import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';

import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  let contract: VotingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientModule ],
      declarations: [ VoteComponent ],
      providers: [ VotingService, Web3Service ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;

    contract = TestBed.get(VotingService);

    console.log('.');

  });

  it('should be created', () => {

    fixture.detectChanges();

    expect(component).toBeTruthy();

  });

  it('should receive candidates', () => {
    const expected = ['abc', 'cde'];

    spyOn(contract, 'getCandidates').and.returnValue(Observable.create(observer => {
      observer.next(expected);
      observer.complete();
    }));

    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.proposal'));

    expect(elements.length).toEqual(expected.length);

  });

  it('should submit request for vote on click', (done: DoneFn) => {

    const transactionReceipt = { transactionHash: 'bar' };
    const expected = transactionReceipt.transactionHash;
    component.account = 'test';

    component.tokens = '1';
    component.proposal = 'foo';
    component.account = 'bar'

    spyOn(contract, 'vote').and.returnValue(Observable.create(observer => {

      observer.next( transactionReceipt );
      observer.complete();

      expect(transactionReceipt.transactionHash).toEqual(expected);

      done();
    }));

    const el = fixture.debugElement.query(By.css('.button')).nativeElement;
    el.click();

    fixture.detectChanges();
  });

});
