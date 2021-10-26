import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/services/auth.guard";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent },
          { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] }
        ]}
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
  exports: [RouterModule, TranslateModule],
  providers: [AuthService, AuthGuard]
})

export class AdminModule {

}
