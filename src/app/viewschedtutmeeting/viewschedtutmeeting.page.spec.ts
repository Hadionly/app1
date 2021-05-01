import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewschedtutmeetingPage } from './viewschedtutmeeting.page';

describe('ViewschedtutmeetingPage', () => {
  let component: ViewschedtutmeetingPage;
  let fixture: ComponentFixture<ViewschedtutmeetingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewschedtutmeetingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewschedtutmeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
