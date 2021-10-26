import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from "../../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public profileForm!: FormGroup;
  public submitted:boolean = false;
  public title: string = '';
  public message: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }


  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Please enter data'
      }
    })

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
    if(this.profileForm.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.profileForm.reset();
      this.router.navigate(['/admin', 'profile']);
      this.submitted = false;
    });

    // this.auth.profile().subscribe((data:any) => data.email);
  };

  add() {
    this.router.navigate(['/admin', 'signup']);
    this.title = 'gofkh';
    localStorage.setItem('ggg', this.title);
  };

}






