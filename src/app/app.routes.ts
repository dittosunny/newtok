import { Routes } from '@angular/router';
import { AddLocationComponent } from './Admin/add-location/add-location.component';
import { LoginComponent } from './Shared/login/login.component';
import { UploadExcelComponent } from './User/upload-excel/upload-excel.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './Shared/register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
   { path: '', component: LoginComponent, pathMatch: 'full' },

   {
     path: 'admin-dashboard',
     component: AdminDashboardComponent,
     canActivate: [authGuard],
     data: { roles: ['admin'] }  // Only accessible by admin role
   },
 
   {
     path: 'add-location',
     component: AddLocationComponent,
     canActivate: [authGuard],
     data: { roles: ['admin'] }  // Only accessible by admin role
   },
 
   {
     path: 'upload-excel',
     component: UploadExcelComponent,
     canActivate: [authGuard],
     data: { roles: ['user', 'admin'] }  // Accessible by both user and admin roles
   },
 
   {
     path: 'user-dashboard',
     component: UserDashboardComponent,
     canActivate: [authGuard],
     data: { roles: ['user', 'admin'] }  // Accessible by both user and admin roles
   },
 
   { path: 'register-user', 
   component: RegisterComponent,
   canActivate: [authGuard],
     data: { roles: ['admin']
   }
  },
 
   { path: '**', redirectTo: '' }
];
