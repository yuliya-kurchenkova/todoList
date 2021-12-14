import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { User, UserData } from '../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { regs } from '../../shared/constants/regs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(regs.EMAIL)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(regs.PASSWORD)
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ])
    });
    const user: User = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName
    };
  }

  public get email() {
    return this.registrationForm.get('email');
  };

  public get password() {
    return this.registrationForm.get('password');
  };

  public submit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.submitted = true;
    this.isLoader = true;

    const user: User = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      birthday: this.registrationForm.value.birthday
    };

    this.fireAuth.signUp(user)
      .then((res: any) => {
        this.res = res;
        this.newUser = res.user;
        this.currentUserId = this.newUser.uid;
        this.displayName = this.newUser.firstName + ' ' + this.newUser.lastName;
        const userData: UserData = {
          uid: this.currentUserId,
          email: user.email,
          displayName: user.firstName + ' ' + user.lastName,
          birthday: user.birthday,
          about: user.about,
          gender: user.gender,
          address: user.address
        }

         this.http
           .post(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.uid}.json`, userData)
           .subscribe(data => {
             this.key = Object.values(data);
             this.id = this.key[0];

             this.fireAuth.signIn(this.registrationForm.value.email, this.registrationForm.value.password)
               .then(res => {
               this.fireAuth.changeIsSignedIn(true);
               this.localStorageService.set('uid', JSON.stringify(res.user?.uid));
               this.registrationForm.reset();
               this.submitted = false;
               this.router.navigate(['/admin', 'profile']);
             })
               .catch(err => {
                 this.fireAuth.changeIsSignedIn(false);
                 this.registrationForm.reset();
                 this.isLoader = false;
                 this.err = err.message;
                 this.showErrorMessage(this.err)
               });
           }, () => {
             this.isLoader = false;
             this.registrationForm.reset();
           })
      })
      .catch( err => {
        this.registrationForm.reset();
        this.isLoader = false;
        this.err = err.message;
        this.showErrorMessage(this.err)
      });
  };

  public showErrorMessage(error: any): void {
    this.toastrService.error(`${error}`);
  };

}

