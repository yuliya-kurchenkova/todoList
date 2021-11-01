import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../admin/shared/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { FirebaseService } from "../../admin/shared/services/firebase.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public language: string = 'en';
  public isLogin: boolean = false
  public isSignIn: boolean = false;


  constructor(
    private router: Router,
    private auth: AuthService,
    private translate: TranslateService,
    private fireAuth: FirebaseService,
  ) {
  translate.setDefaultLang(this.language);
  }

  public ngOnInit(): void {
    this.fireAuth.stream$.subscribe((value: boolean) => {
      console.log(value)
      this.isSignIn = value;
    })
    this.isSignIn = !!localStorage.getItem('uid');
  }

  public logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }

  public changeLanguage(): void {
    this.language === 'en' ? this.language = 'ru' : this.language = 'en';
    this.translate.use(this.language);
  }

  public logoutUser():void {
    this.fireAuth.logout();
    this.fireAuth.changeIsSignedIn(false)
    this.router.navigate(['/admin', 'login']);
  }
}
