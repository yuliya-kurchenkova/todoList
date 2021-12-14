import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../shared/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { regs } from '../../shared/constants/regs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public profileForm!: FormGroup;
  public submitted: boolean = false;
  public message: string = '';
  public err: string = '';
  public isLoader: boolean = false;
  public userData!: any;
  private userId!: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fireAuth: FirebaseService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
    translate.setDefaultLang('en');
  }


  public ngOnInit(): void {

    this.profileForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(regs.EMAIL)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  };

  public get email() {
    return this.profileForm.get('email');
  }

  public get password() {
    return this.profileForm.get('password');
  }

  public submit(): void {
    if (this.profileForm.invalid) return;

    this.submitted = true;

    const user: User = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password
    };

    this.fireAuth.signIn(this.profileForm.value.email, this.profileForm.value.password)
      .then(res => {
        this.userData = res.user;
        this.userId = this.userData?.uid;
        this.isLoader = true;
        this.fireAuth.changeIsSignedIn(true);
        this.localStorageService.set('uid', JSON.stringify(res.user?.uid));
        this.submitted = false;
        this.isLoader = false;
        this.router.navigate(['/admin', 'profile'], {
        queryParams: { id: this.userId }});
      })
      .catch(err => {
        this.fireAuth.changeIsSignedIn(false);
        this.profileForm.reset();
        this.isLoader = false;
        this.err = err.message;
        this.showErrorMessage(this.err)
      });
  };

  public showErrorMessage(error: any): void {
    this.toastrService.error(`${error}`);
  }

  public add(): void {
    this.router.navigate(['/admin', 'signup']);
  };

}






