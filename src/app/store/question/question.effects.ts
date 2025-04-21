import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuestionsActions from '@questions-store/question.actions';
import * as QuestionsSelectors from '@questions-store/question.selectors';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { QuestionsService } from '../../shared/services/questions.service';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly _questionService = inject(QuestionsService);
  private readonly _store = inject(Store); // <-- Inject Store

  // mapping to a different action
  readonly loadQuestions = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.loadQuestionsOfExam),
      // tap(() => console.log('Helllo')),
      switchMap((action) =>
        this._questionService.allQuestionsOnExam(action.examId).pipe(
          // tap((action) => console.log(action)),
          map((questions) =>
            QuestionsActions.setQuestions({
              questions: questions.questions,
            })
          )
        )
      )
    )
  );

  readonly setCurrentQuestion = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.setQuestions),
      withLatestFrom(
        this._store.select(QuestionsSelectors.selectQuestionsList)
      ),
      // tap((action) => console.log(action[1])),
      map(([action, questionsList]) =>
        QuestionsActions.setCurrentQuestion({ question: questionsList[0] })
      )
    )
  );
}
