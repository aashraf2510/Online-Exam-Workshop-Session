import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MainAPIAdapter } from '../../core/adapter/main-adapter';
import { QuestionsAPI } from '../../core/base/question-api';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  QuestionsAdaptResponse,
  QuestionsResponse,
} from '../../core/interfaces/question.interface';
import { Endpoints } from '../../core/enums/endpoints';
import { ErrorResponse } from '../../core/interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService implements QuestionsAPI {
  private readonly _httpClient = inject(HttpClient);
  private readonly _mainAPIAdapter = inject(MainAPIAdapter);

  allQuestions(): Observable<QuestionsAdaptResponse> {
    return this._httpClient.get<QuestionsResponse>(Endpoints.Questions).pipe(
      map((res: QuestionsResponse) =>
        this._mainAPIAdapter.questionAdapter(res)
      ),
      catchError((err: ErrorResponse) => throwError(() => err))
    );
  }
  allQuestionsOnExam(examId: string): Observable<QuestionsAdaptResponse> {
    return this._httpClient
      .get<QuestionsResponse>(Endpoints.QuestionsByExam + examId)
      .pipe(
        map((res: QuestionsResponse) =>
          this._mainAPIAdapter.questionAdapter(res)
        ),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }
}
