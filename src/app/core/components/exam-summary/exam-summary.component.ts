import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuestionsSelectors from '@questions-store/question.selectors';
import * as QuestionsActions from '@questions-store/question.actions';
import * as ExamSelectors from '@exams-store/exam.selectors';
import * as ExamActions from '@exams-store/exam.actions';
import { QuestionDataState } from '@questions-store/question.state';
@Component({
  selector: 'app-exam-summary',
  imports: [],
  templateUrl: './exam-summary.component.html',
  styleUrl: './exam-summary.component.scss',
})
export class ExamSummaryComponent implements OnInit {
  private readonly _store = inject(Store);

  wrongQuestionsList: QuestionDataState[] = [] as QuestionDataState[];

  getWrongQuestions() {
    this._store.select(QuestionsSelectors.selectWrongQuestions).subscribe({
      next: (data) => {
        this.wrongQuestionsList = data;
      },
    });
  }

  closeExam() {
    this._store.dispatch(QuestionsActions.resetQuestionState());
    this._store.dispatch(ExamActions.resetExamStatus());
  }

  ngOnInit(): void {
    this.getWrongQuestions();
  }
}
