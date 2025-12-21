import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const token = inject(TokenService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];
  const userRole = token.getRole();

  if (allowedRoles.includes(userRole!)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
