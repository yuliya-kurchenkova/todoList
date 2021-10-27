import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService} from "@ngx-translate/core";
import { User } from "../../shared/interfaces";
import { FirebaseService } from "../shared/services/firebase.service";


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  public registrationForm!: FormGroup;
  public submitted:boolean = false;
  public title: string = '';
  public message: string = '';


  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fireAuth: FirebaseService
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
        Validators.required,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
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
    console.log(this.registrationForm.invalid)
    if(this.registrationForm.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      uid: this.registrationForm.value.uid
    };

    // this.fireAuth.signUp(user).subscribe(() => {
    //   console.log(user)
    //   this.registrationForm.reset();
    //   this.router.navigate(['/admin', 'profile']);
    //   this.submitted = false;
    // });
    // const user: User = {
    //   email: this.registrationForm.value.email,
    //   password: this.registrationForm.value.password,
    //   // userName: this.registrationForm.value.userName
    // };

    this.fireAuth.signUp(this.registrationForm.value)
      .then((result) => {
        console.log( "result", result)
      })
      this.router.navigate(['/admin', 'profile']);
  }
}
