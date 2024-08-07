import { Routes } from '@angular/router';
import { AddLocationComponent } from './Admin/add-location/add-location.component';
import { LoginComponent } from './Shared/login/login.component';
import { UploadExcelComponent } from './User/upload-excel/upload-excel.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';

export const routes: Routes = [
   { path:'add-location',component:AddLocationComponent},
   {path:'login', component:LoginComponent},
   {path:'upload-excel',component:UploadExcelComponent},
   {path:'view-weather', component: UserDashboardComponent}
];
