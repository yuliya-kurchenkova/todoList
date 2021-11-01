import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../shared/services/firebase.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public profileForm!: FormGroup;
  public submitted: boolean = false;
  public isActive: boolean = false;
  public message: string = '';
  public err: string = '';
  public isLoader: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fireAuth: FirebaseService,
  ) {
    translate.setDefaultLang('en');
  }


  public ngOnInit(): void {

    this.profileForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
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
    if (this.profileForm.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
    };

    this.fireAuth.signIn(this.profileForm.value.email, this.profileForm.value.password)
      .then(res => {
        this.isLoader = true;
        let userData = res.user;
        let userId = userData?.uid;
        this.fireAuth.changeIsSignedIn(true);
        localStorage.setItem('uid', JSON.stringify(res.user?.uid))
        this.profileForm.reset();
        this.submitted = false;
        this.isLoader = false;
        this.router.navigate(['/admin', 'profile'], {
        queryParams: { id: userId }
        })
      })
      .catch(err => {
        this.isLoader = false
        this.err = err.message
      })
  }

  public add(): void {
    this.router.navigate(['/admin', 'signup']);
  };

}






