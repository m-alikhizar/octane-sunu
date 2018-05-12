import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';

import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { By } from '@angular/platform-browser';

import { VotingService, Web3Service } from '../../services/services';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let contract: VotingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientModule ],
      declarations: [ StatsComponent ],
      providers: [ VotingService, Web3Service ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    contract = TestBed.get(VotingService);

  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should return Observable from stats and reflect in view', () => {

    const expected = [{
      proposal: 'abc',
      voteCount: 1
    }];

    const expectedProposal = 'test';

    spyOn(contract, 'stats').and.returnValue(Observable.create(observer => {
      observer.next(expected);
      observer.complete();
    }));

    spyOn(contract, 'proposal').and.returnValue(Observable.create(observer => {
      observer.next(expectedProposal);
      observer.complete();
    }));

    fixture.detectChanges();

    const el = fixture.debugElement.queryAll(By.css('.record'));
    const proposalEl = fixture.debugElement.query(By.css('.proposal'));

    expect(el.length).toEqual(expected.length);

    expect(proposalEl.nativeElement.textContent.trim()).toEqual(expectedProposal);

  });
});
