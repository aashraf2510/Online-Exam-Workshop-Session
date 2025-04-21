import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuestionsActions from '@questions-store/question.actions';
import { filter, map } from 'rxjs';

import * as ExamActions from '@exams-store/exam.actions';

@Injectable()
export class ExamEffects {
  private readonly actions$: Actions = inject(Actions);

  readonly startExam = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.setCurrentQuestion),
      map(() => ExamActions.updateExamStatus({ status: 'Started' }))
    )
  );

  readonly completeExam = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.setWrongQuestions),
      map(() => ExamActions.updateExamStatus({ status: 'Completed' }))
    )
  );

  readonly toggleModal = createEffect(() =>
    this.actions$.pipe(
      ofType(ExamActions.updateExamStatus),
      filter(({ status }) => status === 'Started' || status === 'Closed'),
      map(() => ExamActions.toggleModal())
    )
  );
}
