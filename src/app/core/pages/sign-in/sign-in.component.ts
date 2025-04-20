import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { StorageManagerService } from '../../../shared/services/storage-manager.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthApiService } from 'auth-api';
import * as AuthActions from '../../../store/auth/auth.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  private flowbiteService: FlowbiteService = inject(FlowbiteService);

  private readonly _authService = inject(AuthApiService);
  private readonly _router = inject(Router);
  private readonly _store = inject(Store);
  private destroy$ = new Subject<void>();

  loginForm!: FormGroup;

  constructor() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  signIn(): void {
    if (this.loginForm.valid) {
      this._authService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this._store.dispatch(
              AuthActions.loginSuccess({ token: res.token, rememberMe: true })
            );

            this._router.navigate(['/home']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
