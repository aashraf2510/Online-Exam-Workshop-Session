import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MainAPIAdapter } from '../../core/adapter/main-adapter';
import { ExamsAPI } from '../../core/base/exam-api';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  ExamsAdaptResponse,
  ExamsResponse,
} from '../../core/interfaces/exam.interface';
import { Endpoints } from '../../core/enums/endpoints';
import { ErrorResponse } from '../../core/interfaces/error';
import { environment } from '../../env/env.prod';

@Injectable({
  providedIn: 'root',
})
export class ExamsService implements ExamsAPI {
  private readonly _httpClient = inject(HttpClient);
  private readonly _mainAPIAdapter = inject(MainAPIAdapter);

  allExams(): Observable<ExamsAdaptResponse> {
    return this._httpClient
      .get<ExamsResponse>(environment.apiUrl + '/' + Endpoints.Exams)
      .pipe(
        map((res: ExamsResponse) => this._mainAPIAdapter.examAdapter(res)),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  allExamsBySubject(subjectId: string): Observable<ExamsAdaptResponse> {
    return this._httpClient
      .get<ExamsResponse>(
        environment.apiUrl + '/' + Endpoints.ExamsBySubject + subjectId
      )
      .pipe(
        map((res: ExamsResponse) => this._mainAPIAdapter.examAdapter(res)),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }
}
