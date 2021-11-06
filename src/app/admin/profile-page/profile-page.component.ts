import { Component, OnInit } from '@angular/core';
import { User, Task, ExampleTab } from '../../shared/interfaces/interfaces'
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Observable, Observer, Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/services/firebase.service';
import {EditTaskModalComponent} from "./edit-task-modal/edit-task-modal.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";


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
  public formAddTask1: FormGroup | any;
  public stream$ = new Subject<Task>();


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fireStore: FirebaseService,
    private dialog: MatDialog,
  ) {
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
    }, err => {
      this.error = err.message;
    })

    this.http
      .get<Task[]>(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${this.idUrl}.json`)
      .subscribe((data: any) => {
        let localId = Object.keys(data)[0];
        this.profile = data[`${localId}`];
        this.displayName = this.profile.displayName;
      }, err => {
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
      description: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required])
    });

  }

  public addTask(): void {
    if (this.formAddTask.invalid) {
    }

    const task: Task = {
      id: this.formAddTask.value.id,
      title: this.formAddTask.value.title,
      description: this.formAddTask.value.description,
      date: this.formAddTask.value.date
    };

    this.http.post(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${(this.idUrl)}.json`, task)
      .subscribe(res => {
        this.tasks.push(task);
        this.formAddTask.reset();
      }, err => {
        this.error = err.message;
      });
  }

  public removeTask(task: Task): void {
    this.fireStore.remove(task, this.idUrl)
      .subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      }, err => {
        this.error = err.message;
      });
  }

  public openDialog(task: Task) {
    this.stream$.next(task);
    console.log(task)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EditTaskModalComponent, {
      width: '500px',
      data: task
    });

    this.fireStore.editTask(task, this.idUrl)
      .subscribe((e) => {
        console.log(e)
        console.log(e.title)
        this.formAddTask1 = new FormGroup({
          title: new FormControl(e.title, [Validators.required]),
          description: new FormControl(e.description, [Validators.required])
        });
      }, err => {
        this.error = err.message;
      });
  }

  // openDialog(): void {
  //
  //   const dialogRef = this.dialog.open(EditTaskModalComponent, {
  //     width: '250px'
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
//}

}
