import { Observable } from 'rxjs';
import { LoginAdapterResponse, LoginRequest } from '../interfaces/login';

export abstract class AuthAPI {
  /**
   * @summary This method is used to submit the login details of the user and return the result from backend
   * @param data the data submitted in [ Login ] Form
   * @returns Observable
   */
  abstract login(data: LoginRequest): Observable<LoginAdapterResponse>;
}
