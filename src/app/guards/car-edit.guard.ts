import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const carEditGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (!(route.queryParams['id'])) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
