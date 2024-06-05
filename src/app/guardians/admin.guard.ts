import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, segments) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  console.log(adminGuard)

  const admin = authService.isAdmin()

  return admin ? admin : router.navigate(["login"])
};
