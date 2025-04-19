import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthAPIAdapter } from '../adapter/auth-api.adapter';
import {
  LoginAdapterResponse,
  LoginRequest,
  LoginResponse,
} from '../interfaces/login';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../interfaces/error';
import { AuthEndpoints } from '../enums/AuthEndpoints';
import { BASE_URL } from '../base/token';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  // Inject Services
  private readonly _HttpClient = inject(HttpClient);
  private readonly _AuthAPIAdapter = inject(AuthAPIAdapter);
  private readonly _BaseURL = inject(BASE_URL);

  // Login Method
  login(data: LoginRequest): Observable<LoginAdapterResponse> {
    return this._HttpClient
      .post<LoginResponse>(this._BaseURL + AuthEndpoints.LOGIN, data)
      .pipe(
        map((res: LoginResponse) => this._AuthAPIAdapter.adapt(res)),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }
}
