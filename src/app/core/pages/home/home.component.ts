import { Component, inject, OnInit } from '@angular/core';
import { CustomModalComponent } from '../../../shared/ui/custom-modal/custom-modal.component';
import { Store } from '@ngrx/store';
import * as ExamActions from '@examStore/exam.actions';
import * as ExamSelectors from '@examStore/exam.selector';
import * as QuestionActions from '@questionStore/question.actions';
import * as QuestionSelectors from '@questionStore/question.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { exmStatus } from '@examStore/exam.state';
import { ExamComponent } from '../../../shared/business/exam/exam.component';

@Component({
  selector: 'app-home',
  imports: [CustomModalComponent, AsyncPipe, ExamComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _examId: string = '6700707030a3c3c1944a9c5d';
  readonly examName: string = 'HTML';
  private readonly _store = inject(Store);

  isOpen$!: Observable<boolean>;
  examStatus$!: Observable<exmStatus>;

  eventsChange() {
    this.isOpen$ = this._store.select(ExamSelectors.selectExamModal);
    this.examStatus$ = this._store.select(ExamSelectors.selectExamStatus);
  }

  startExam() {
    this._store.dispatch(ExamActions.toggleModal());
    this._store.dispatch(
      QuestionActions.loadQuestions({ examId: this._examId })
    );
    // this._store.select(QuestionSelectors.selectQuestions).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    // });
  }

  // Life Cycle methods
  ngOnInit(): void {
    this.eventsChange();
  }
}
