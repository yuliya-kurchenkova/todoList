import { Component,OnInit } from '@angular/core';
import { User, Task } from '../../shared/interfaces/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/services/firebase.service';
import { EditTaskModalComponent } from '../components/edit-task-modal/edit-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskModalComponent } from '../components/delete-task-modal/delete-task-modal.component';
import { MyTask } from '../shared/services/task';
import { baseURL } from '../../../environments/environment';
import { EditProfileModalComponent } from '../components/edit-profile-modal/edit-profile-modal.component';
import { FbCommentsService } from '../shared/services/fbComments.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [AuthService]
})
export class ProfilePageComponent implements OnInit {
  public user!: User;
  public users: User[] = [];

  public profile!: any;
  public displayName: any;
  public error: string = '';
  public value: string = '';
  public formAddTask!: FormGroup;
  public tasks: Task[] = [];
  public status: string = 'new'
  public myTask = new MyTask()
  public t: any;
  public selected: number = 1;
  public currentTask: any;
  public uidCurrent: any;
  public nameUser: any;
  public data: any;
  public emailUser: any;
  public result: any;
  public localId: string | any;
  public addressUser: any;
  public aboutUser: any;
  public birthday: any;
  public genderUser: any;
  public phoneNumber: any;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fireStore: FirebaseService,
    private dialog: MatDialog,
    private fbComment: FbCommentsService
  ) { }


  public ngOnInit(): void {
    if(localStorage.getItem('uid')) {
      this.uidCurrent = JSON.parse(localStorage.uid)
      this.getUser();
      this.getTask();
      this.status = 'new';
    }

    this.formAddTask = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      status: new FormControl('new'),
    });
  }


  public sortFuncNew () {
    this.tasks.sort((a: Task, b: Task) => {
      let dateSplitA = a.dateAdd.split(".");
      let dateSplitB = b.dateAdd.split(".");
      let dateTimeStampA = new Date(+dateSplitA[2], +dateSplitA[1] - 1, +dateSplitA[0]).getTime();
      let dateTimeStampB = new Date(+dateSplitB[2], +dateSplitB[1] - 1, +dateSplitB[0]).getTime();
      let ss = dateTimeStampA - dateTimeStampB;
      return -ss;
    });
  };

  public sortFuncOld() {
    this.tasks.sort((a: Task, b: Task) => {
      let dateSplitA = a.dateAdd.split(".");
      let dateSplitB = b.dateAdd.split(".");
      let dateTimeStampA = new Date(+dateSplitA[2], +dateSplitA[1] - 1, +dateSplitA[0]).getTime();
      let dateTimeStampB = new Date(+dateSplitB[2], +dateSplitB[1] - 1, +dateSplitB[0]).getTime();
      let ss = dateTimeStampB - dateTimeStampA
      return -ss;
    });
  };

  public getUser(): void {
    this.http
      .get(`${baseURL}users/${this.uidCurrent}.json`)
      .subscribe((data: any) => {
        this.data = data
        this.localId = Object.keys(data)[0];
        this.profile = data[`${this.localId}`];
        this.nameUser = this.profile.displayName;
        this.emailUser = this.profile.email;
        this.addressUser = this.profile.address;
        this.aboutUser = this.profile.about;
        this.birthday = this.profile.birthday;
        this.genderUser = this.profile.gender;
        this.phoneNumber = this.profile.phoneNumber;
      });
  };

  public getTask(): void {
    this.http.get<any>(`${baseURL}tasks/${( JSON.parse(localStorage.uid))}.json`)
      .subscribe(tasks => {
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          this.tasks.push(task);
        }
      });
  };

  public addTask(): void {
    const task: Task = {
      id: this.formAddTask.value.id,
      title: this.formAddTask.value.title,
      description: this.formAddTask.value.description,
      date: this.formAddTask.value.date,
      status: this.formAddTask.value.status = "new",
      newComment: this.formAddTask.value.newComment,
      dateAdd: new Date().toLocaleDateString()
    };
    this.fireStore.addNewTask(task, ( JSON.parse(localStorage.uid)))
      .subscribe( e => {
        this.tasks.push(e);
        this.formAddTask.reset();
      }, err => {
        this.error = err.message;
      });
  };

  public removeTask(myTask: MyTask): void {
    let dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '500px',
      data: myTask
    });
    this.currentTask = myTask;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.fireStore.remove(myTask,  JSON.parse(localStorage.uid))
        .subscribe(() => {
          this.fbComment.delFbComment('',  (JSON.parse(localStorage.uid)), this.currentTask.id).subscribe(() => {
            this.tasks = this.tasks.filter(t => t.id !== myTask.id);
          })
        }, err => {
          this.error = err.message;
        });
      }
    });
  };

  public openDialog(task: Task): void {
    let dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '500px',
      data: task
    });
    this.currentTask = task;
    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.fireStore.updateTask(result, (JSON.parse(localStorage.uid)), result.id)
            .subscribe(e => {
              this.tasks = [];
              if(this.selected === 1) {
                this.filterAll()
              } else if(this.selected === 2) {
                this.filterNew()
              } else if(this.selected === 3) {
                this.filterInProcess()
              } else if(this.selected === 4) {
                this.filterDone()
              }
            }, err => {
              this.error = err.message;
            });
        }
      }, err => {
        this.error = err.message;
      });
  };

  public openEditProfile(): void {
    let dialogRef = this.dialog.open(EditProfileModalComponent, {
      width: '500px',
      data: this.data
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.fireStore.editProfile(result, (JSON.parse(localStorage.uid)), this.localId)
            .subscribe( e => {
              this.getUser();
            },err => {
              this.error = err.message;
            });
        }
      }, err => {
        this.error = err.message;
      });
  };

  public filterNew(): void {
    this.fireStore.getTask(this.myTask,  JSON.parse(localStorage.uid))
      .subscribe(tasks => {
        this.tasks = [];
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          if (task.status === 'new') {
            this.tasks.push(task);
          }
        }
      }, err => {
        this.error = err.message;
      });
  };

  public filterAll(): void {
    this.fireStore.getTask(this.myTask, JSON.parse(localStorage.uid))
      .subscribe(tasks => {
        this.tasks = [];
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          if (task) {
            this.tasks.push(task);
          }
        }
      }, err => {
        this.error = err.message;
      });
  };

  filterInProcess() {
    this.fireStore.getTask(this.myTask,  JSON.parse(localStorage.uid))
      .subscribe(tasks => {
        this.tasks = [];
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          if (task.status === 'inProcess') {
            this.tasks.push(task);
          }
        }
      }, err => {
        this.error = err.message;
      });
  }

  public filterDone(): void {
    this.fireStore.getTask(this.myTask, JSON.parse(localStorage.uid))
      .subscribe(tasks => {
        this.tasks = [];
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          if (task.status === 'completed') {
            this.tasks.push(task);
          }
        }
      }, err => {
        this.error = err.message;
      });
  };

}
