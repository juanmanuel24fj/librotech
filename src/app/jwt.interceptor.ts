import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("token")

  if (token) {
    req = req.clone({
      setHeaders: {Authorization: token}
    })
  }
  
  return next(req).pipe(
  )
};
