import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import * as QuestionActions from './question.actions';
import * as ExamActions from '@examStore/exam.actions';
import { QuestionsService } from '../../shared/services/questions.service';

@Injectable()
export class QuestionsEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _questionsService = inject(QuestionsService);
  // mapping to a different action
  readonly loadQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.loadQuestions),
      switchMap((action) =>
        this._questionsService.allQuestionsOnExam(action.examId).pipe(
          tap((action) => console.log(action)),
          map((dataRes) => {
            tap((dataRes) => console.log('The data : ', dataRes));
            return QuestionActions.setQuestions({
              questions: dataRes.questions,
            });
          })
        )
      )
    )
  );

  readonly setQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.setQuestions),
      map(() => {
        return ExamActions.updateExamStatus({ status: 'Started' });
      })
    )
  );
}
