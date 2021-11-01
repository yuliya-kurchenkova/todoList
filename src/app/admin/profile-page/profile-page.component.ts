import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [AuthService]
})
export class ProfilePageComponent implements OnInit {

  public user!: User
  public key!: string[];
  public id!: string;
  public localId!: string;
  public data:  any = 1
  public profile!: any;
  public displayName: any;
  public error: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ){}

  public ngOnInit(): void{
    let id
    this.route.queryParams.subscribe(url => {
      id = url.id
    },err => {
      this.error = err.message;
    })

    this.http
      .get(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
      .subscribe((data:any) => {
        this.data = data
        this.key = Object.keys(data)
        this.id = this.key[0]
        this.localId = this.id
        this.profile = data[`${this.localId}`]
        this.displayName = this.profile.displayName
      },err => {
      this.error = err.message;
    })
  }
}
