import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../admin/shared/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public language: string = 'en';

  constructor(
    private router: Router,
    private auth: AuthService,
    private translate: TranslateService
  ) {
  translate.setDefaultLang(this.language);
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

}
