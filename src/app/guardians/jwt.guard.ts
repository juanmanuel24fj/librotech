import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const jwtGuard: CanActivateFn = (route, segments) => {
  
  const authService = inject(AuthService)
  const router = inject(Router)

  console.log(jwtGuard)

  const login = authService.isAuthenticated()

  return login ? login : router.navigate(["login"])
};
