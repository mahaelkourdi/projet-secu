import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ModifyUserComponent } from './admin/modify-user/modify-user.component';
import {HomeComponent} from "./home/home.component";
import { RegisterComponent } from './register/register.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { ProfileComponent } from './user/profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'homeUser/:id', component: HomeUserComponent},
  { path: 'homeAdmin', component: HomeAdminComponent},
  { path: 'modify', component: ModifyUserComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
