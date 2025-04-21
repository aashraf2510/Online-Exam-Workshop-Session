import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuestionsSelectors from '@questions-store/question.selectors';
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

  ngOnInit(): void {
    this.getWrongQuestions();
  }
}
