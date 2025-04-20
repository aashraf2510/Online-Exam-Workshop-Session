import { HttpInterceptorFn } from '@angular/common/http';
import { StorageManagerService } from '../../shared/services/storage-manager.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _storageManager = inject(StorageManagerService);
  const token = _storageManager.getItem('token');

  if (token) {
    console.log(token);
    req = req.clone({
      setHeaders: {
        token: token,
      },
    });
  }
  return next(req);
};
