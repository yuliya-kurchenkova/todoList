import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent  implements OnInit {

  constructor(private http: HttpClient,) {
  }

  ngOnInit() {

    this.http.get('https://www.google.com')
      .subscribe(() => {
        console.log('fff')
      })

  }

}
