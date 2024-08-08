import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject,  } from '@angular/core';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const allowedRoles = route.data['roles'] as Array<string>;

  if (token && role) {
    if (allowedRoles && allowedRoles.includes(role)) {
      return true; 
    } else {
      // Redirect based on the user's role
      if (role === 'admin') {
        return router.createUrlTree(['/admin-dashboard']);
      } else if (role === 'user') {
        return router.createUrlTree(['/user-dashboard']);
      } else {
        return router.createUrlTree(['/login']); 
      }
    }
  } else {
    // Redirect to login if not authenticated
    return router.createUrlTree(['/login']);
  }
};
