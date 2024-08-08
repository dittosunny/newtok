import { CanActivateFn } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if the code is running in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const allowedRoles = route.data['roles'] as Array<string> || [];

    // Check if the user is authenticated and has an appropriate role
    if (token && role) {
      if (allowedRoles.includes(role)) {
        return true; // Allow access if the user's role is in the allowed roles
      } else {
        // Redirect based on the user's role
        if (role === 'admin') {
          return router.createUrlTree(['/admin-dashboard']);
        } else if (role === 'user') {
          return router.createUrlTree(['/user-dashboard']);
        } else {
          return router.createUrlTree(['/login']); // Fallback for unexpected roles
        }
      }
    } else {
      // Redirect to login if not authenticated
      return router.createUrlTree(['/login']);
    }
  } else {
    // If localStorage is not available (not running in the browser), redirect to login
    return router.createUrlTree(['/login']);
  }
};

