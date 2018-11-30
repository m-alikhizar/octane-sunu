import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { Web3Service } from '../../services/services';
import { AccountItem } from '../models';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;
  let web3Service: Web3Service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsComponent],
      providers: [Web3Service]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    web3Service = TestBed.get(Web3Service);

  });

  it('should be created', () => {

    spyOn(web3Service, 'getAccounts').and.returnValue(Observable.create(observer => {
      observer.next([new AccountItem('abc')]);
      observer.complete();
    }));

    fixture.detectChanges();

    expect(component).toBeTruthy();

  });

  xit('should be populated with accounts of type AccountItem', () => {
    const expected = new AccountItem('abc');

    spyOn(web3Service, 'getAccounts').and.returnValue(Observable.create(observer => {
      observer.next([expected]);
      observer.complete();
    }));

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.address'));
    expect(el.nativeElement.textContent.trim()).toEqual(expected.address);

  });
});
