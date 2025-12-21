// // import { inject } from '@angular/core';
// // import { CanActivateFn, Router } from '@angular/router';
// // import { TokenService } from '../core/services/token.service';

// // export const authGuard: CanActivateFn = () => {

// //   const token = inject(TokenService);
// //   const router = inject(Router);

// //   if (token.isLoggedIn()) {
// //     return true;
// //   }

// //   router.navigate(['/login']);
// //   return false;
// // };
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';

// export const authGuard: CanActivateFn = () => {

//   const auth = inject(AuthService);
//   const router = inject(Router);

//   if (auth.isLoggedIn()) return true;

//   auth.logout();
//   return false;
// };
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

