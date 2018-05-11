import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DelegateComponent } from './delegate.component';
import { VotingService, Web3Service } from '../../services/services';

import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';

describe('DelegateComponent', () => {
  let component: DelegateComponent;
  let fixture: ComponentFixture<DelegateComponent>;
  let contract: VotingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, HttpClientModule],
      declarations: [ DelegateComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ VotingService, Web3Service ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateComponent);
    component = fixture.componentInstance;
    contract = TestBed.get(VotingService);

    console.log('.');

  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();

  });

  it('should receive account as @input', () => {

    component.account = 'test';

    fixture.detectChanges();

    expect(component.getAccount()).toEqual('test');

  });

  it('should submit request for delegate on click', (done: DoneFn) => {

    const transactionReceipt = { transactionHash: 'bar' };
    const expected = transactionReceipt.transactionHash;
    component.account = 'test';

    component.delegateAddress = 'foo';
    component.tokens = '1';

    spyOn(contract, 'delegate').and.returnValue(Observable.create(observer => {

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
