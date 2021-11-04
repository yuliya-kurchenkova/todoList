import { Component, OnInit } from '@angular/core';
import { User, Task, ExampleTab } from '../../shared/interfaces/interfaces'
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [AuthService]
})
export class ProfilePageComponent implements OnInit {
  public asyncTabs: Observable<ExampleTab[]>;
  public user!: User;
  public idUrl!: string;
  public profile!: any;
  public displayName: any;
  public error: string = '';
  public value: string = '';
  public formAddTask!: FormGroup;
  public tasks: Task[] = [];


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ){
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'All', content: 'Content 1'},
          {label: 'New', content: 'Content 2'},
          {label: 'Old', content: 'Content 3'}
        ]);
      }, 1000);
    });
  }


  public ngOnInit(): void {

    this.route.queryParams.subscribe(url => {
      this.idUrl = url.id;
    },err => {
      this.error = err.message;
    })

    this.http
      .get<Task[]>(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${this.idUrl}.json`)
      .subscribe((data: any) => {
        let localId = Object.keys(data)[0];
        this.profile = data[`${localId}`];
        this.displayName = this.profile.displayName;
      },err => {
        this.error = err.message;
      })

    this.http.get<Task[]>(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${(this.idUrl)}.json`)
      .subscribe(tasks => {
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          this.tasks.push(task);
        }
      });

    this.formAddTask = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  public addTask(): void {
    if (this.formAddTask.invalid) {}

    const task: Task = {
      title: this.formAddTask.value.title,
      description: this.formAddTask.value.description
    };

    this.http.post(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${(this.idUrl)}.json`, task)
      .subscribe(res => {
        this.tasks.push(task);
        this.formAddTask.reset();
    }, err => {
        this.error = err.message;
      });
  }

}
