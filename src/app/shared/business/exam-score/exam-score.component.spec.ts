import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamScoreComponent } from './exam-score.component';

describe('ExamScoreComponent', () => {
  let component: ExamScoreComponent;
  let fixture: ComponentFixture<ExamScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
