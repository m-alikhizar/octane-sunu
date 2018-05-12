import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MainComponent } from './main.component';

describe('MainComponent', () => {

  class MockActivatedRoute {
    get params() {
      return Observable.create(observer => {
        observer.next({'account': 'test'});
        observer.complete();
      })
    }
  };

  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ {
        provide: ActivatedRoute,
        useClass: MockActivatedRoute
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should be created', () => {

    expect(component).toBeTruthy();

  });

  it('should set account from from ActivatedRoute', () => {

    const account = component.getAccount();
    expect(account).toBeTruthy('test');

  });
});
