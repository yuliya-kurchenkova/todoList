import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { CreatePageComponent } from './create-page/create-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { TaskService } from './shared/services/task.service';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { MatMenuModule } from '@angular/material/menu';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpErrorInterceptorService} from "../shared/httperor-interceptor.service";
import {MatBadgeModule} from '@angular/material/badge'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EditCommentModalComponent } from './components/edit-comment-modal/edit-comment-modal.component';
import { DeleteCommentModalComponent } from './components/delete-comment-modal/delete-comment-modal.component';
import { CommentTaskComponent } from './profile-page/task-item/comment-task/comment-task.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { TaskItemComponent } from './profile-page/task-item/task-item.component';
import {SearchPipe} from "./shared/services/search.pipe";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ProfilePageComponent,
    SignupPageComponent,
    CreatePageComponent,
    EditTaskModalComponent,
    DeleteTaskModalComponent,
    EditCommentModalComponent,
    DeleteCommentModalComponent,
    CommentTaskComponent,
    EditProfilePageComponent,
    TaskItemComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent },
          { path: 'signup', component: SignupPageComponent},
          { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
          { path: 'profile', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'edit-profile', component: EditProfilePageComponent, canActivate: [AuthGuard]}
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
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule

  ],
  exports: [RouterModule, TranslateModule],
  providers: [AuthService, AuthGuard, TaskService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
  ],
  entryComponents: [
    EditTaskModalComponent,
    DeleteTaskModalComponent
  ],
})

export class AdminModule {
}
