import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService} from "@ngx-translate/core";

import { FirebaseService } from "../shared/services/firebase.service";
import { User } from "../../shared/interfaces/interfaces";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  public registrationForm!: FormGroup;
  public submitted: boolean = false;
  public users: any;
  public key!: [string, (((v: PropertyKey) => boolean) | (() => string) | (() => Object) | ((v: Object) => boolean) | Function)][];
  public id!:  any;
  public newUser: any;
  public currentUserId: any;
  public displayName: any;
  public res: any;
  public err: string = '';
  public isLoader: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fireAuth: FirebaseService,
    private http: HttpClient
  ) {
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ])
    });
  }

  public get email() {
    return this.registrationForm.get('email');
  }

  public get password() {
    return this.registrationForm.get('password');
  }

  public submit(): void {
    if (this.registrationForm.invalid) {
      return
    }
    this.submitted = true;
    this.isLoader = true;

    const user: User = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName
    };

    this.fireAuth.signUp(user)
      .then((res: any) => {
        this.res = res
        this.newUser = res.user;
        this.currentUserId = this.newUser.uid;
        this.displayName = this.newUser.firstName + ' ' + this.newUser.lastName;

        const userData = {
          uid: this.currentUserId,
          email: user.email,
          displayName: user.firstName + ' ' + user.lastName
        }

         this.http
           .post(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.uid}.json`, userData)
           .subscribe(data => {
             this.key = Object.values(data);
             this.id = this.key[0];

             this.fireAuth.signIn(this.registrationForm.value.email, this.registrationForm.value.password)
               .then(res => {
               this.registrationForm.reset();
               this.submitted = false;
               this.router.navigate(['/admin', 'profile'], {
                 queryParams: { id: this.currentUserId }
               });
             })
               .catch(err => {
                 this.isLoader = false;
                 this.err = err.message;
               })
           }, err => {
             this.err = err.message;
             this.isLoader = false;
           })
      })
      .catch( err => {
        this.isLoader = false;
        this.err = err.message;
      })
  }
}
