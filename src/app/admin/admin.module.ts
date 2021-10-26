import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { FirebaseService } from "./shared/services/firebase.service";

import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";

import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/services/auth.guard";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ProfilePageComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent },
          { path: 'signup', component: SignupPageComponent },
          { path: 'profile', component: ProfilePageComponent}
        ]}
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [RouterModule, TranslateModule],
  providers: [AuthService, AuthGuard, FirebaseService]
})

export class AdminModule {

}
