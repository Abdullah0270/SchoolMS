import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Browser check
  if (typeof window === 'undefined') return true;

  if (tokenService.isLoggedIn()) return true;

  // Expired or missing token → redirect
  router.navigate(['/login']);
  return false;
};

