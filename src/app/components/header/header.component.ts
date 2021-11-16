import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../admin/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../../admin/shared/services/firebase.service';
import { LocalStorageService } from '../../admin/shared/services/local-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public language: string = 'en';
  public isLogin: boolean = false;
  public isSignIn: boolean = false;


  constructor(
    private router: Router,
    private auth: AuthService,
    private translate: TranslateService,
    private fireAuth: FirebaseService,
    private localStorageService: LocalStorageService
  ) {
  translate.setDefaultLang(this.language);
  }

  public ngOnInit(): void {
    this.fireAuth.stream$.subscribe((value: boolean) => {
      this.isSignIn = value;
    })
    this.isSignIn = !!this.localStorageService.get('uid');
  };

  public login(): void {
    this.router.navigate(['/admin', 'login']);
  };

  public changeLanguage(): void {
    this.language = this.language === 'en' ?  'ru' : 'en';
    this.translate.use(this.language);
  };

  public logoutBtn(): void {
    console.log('logout')
    this.fireAuth.logout();
    this.router.navigate(['/admin', 'login']);
  };
}
