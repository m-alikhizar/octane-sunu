import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Web3Service, VotingService} from '../services/services'
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


describe('AppComponent', () => {
  let contract: VotingService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let spy;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpModule, HttpClientModule ],
      declarations: [ AppComponent ],
      providers: [ VotingService, Web3Service ]
    }).compileComponents();

  }));


  beforeEach(() => {
    contract = TestBed.get(VotingService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    spy = spyOn(contract, 'loadABI').and.returnValue(Observable.create(observer => {
      observer.next();
      observer.complete();
    }));

    fixture.detectChanges();

  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();

  }));

  it('should load the pre requisites', async(() => {
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

  }));

  it('should set loaded boolean to true', async(() => {
    const expected = 'connected';
    const el = fixture.debugElement.query(By.css('.title'));
    expect(el.nativeElement.classList).toContain(expected);

  }));
});
