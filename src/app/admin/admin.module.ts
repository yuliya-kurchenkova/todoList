import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";

import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";

import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/services/auth.guard";
import { CreatePageComponent } from "./create-page/create-page.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ProfilePageComponent,
    SignupPageComponent,
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent },
          { path: 'signup', component: SignupPageComponent },
          { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] }
        ]}
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [RouterModule, TranslateModule],
  providers: [AuthService, AuthGuard]
})

export class AdminModule {

}
