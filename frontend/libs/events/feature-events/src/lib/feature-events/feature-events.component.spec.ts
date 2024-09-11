import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureEventsComponent } from './feature-events.component';

describe('FeatureEventsComponent', () => {
  let component: FeatureEventsComponent;
  let fixture: ComponentFixture<FeatureEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
