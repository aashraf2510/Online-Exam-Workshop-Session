import { LoginAdapterResponse, LoginResponse } from './login';

export interface Adapter {
  adapt(data: LoginResponse): LoginAdapterResponse;
}
