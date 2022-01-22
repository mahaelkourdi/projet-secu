import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ModifyUserComponent } from './admin/modify-user/modify-user.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  {
    path: '',
    canActivateChild: [UserGuard],
    children: [
      { path: 'homeUser', component: HomeUserComponent },
      { path: 'profile/:id', component: ProfileComponent },
    ],
  },
  {
    path: '',
    canActivateChild: [AdminGuard],
    children: [
      { path: 'homeAdmin', component: HomeAdminComponent },
      { path: 'addUserAdmin', component: AddUserComponent },
      { path: 'modifyAdmin/:id', component: ModifyUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
