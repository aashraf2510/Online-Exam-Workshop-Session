import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionAdapt } from '../../../core/interfaces/question.interface';
import * as QuestionSelectors from '@questionStore/question.selectors';
import * as QuestionActions from '@questionStore/question.actions';
import * as ExamActions from '@examStore/exam.actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-exam-summary',
  imports: [AsyncPipe],
  templateUrl: './exam-summary.component.html',
  styleUrl: './exam-summary.component.scss',
})
export class ExamSummaryComponent implements OnInit {
  // wrongQuestions: QuestionAdapt[] = [] as QuestionAdapt[];

  wrongQuestions$!: Observable<QuestionAdapt[]>;

  private readonly _store = inject(Store);

  getWrongQuestions() {
    // this._store.select(QuestionSelectors.selectWrongQuestions).subscribe({
    //   next: (dataList) => {
    //     this.wrongQuestions = dataList;
    //   },
    // });

    this.wrongQuestions$ = this._store.select(
      QuestionSelectors.selectWrongQuestions
    );
  }

  closeModal() {
    // Clear Exam State
    this._store.dispatch(ExamActions.resetExamState());
    //Clear Question State
    this._store.dispatch(QuestionActions.resetQuestionState());
  }

  ngOnInit(): void {
    this.getWrongQuestions();
  }
}
