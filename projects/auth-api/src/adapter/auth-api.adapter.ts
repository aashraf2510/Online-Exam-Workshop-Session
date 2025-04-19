import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { LoginAdapterResponse, LoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdapter implements Adapter {
  constructor() {}

  adapt(data: LoginResponse): LoginAdapterResponse {
    return {
      token: data.token,
      message: data.message,
      email: data.user.email,
      id: data.user._id,
      role: data.user.role,
    };
  }
}
