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
import { ToastrService } from 'ngx-toastr';
import { baseURL } from '../../../environments/environment';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [AuthService]
})
export class ProfilePageComponent implements OnInit {
  public user!: User;
  public idUrl!: string;
  public profile!: any;
  public displayName: any;
  public error: string = '';
  public value: string = '';
  public formAddTask!: FormGroup;
  public tasks: Task[] = [];
  public status: string = 'all'
  public key!: string
  public myTask = new MyTask()
  public t: any;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fireStore: FirebaseService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }


  public ngOnInit(): void {

    this.route.queryParams.subscribe(url => {
      this.idUrl = url.id;
    }, err => {
      this.error = err.message;
    })

    this.http
      .get<MyTask[]>(`${baseURL}users/${this.idUrl}.json`)
      .subscribe((data: any) => {
        let localId = Object.keys(data)[0];
        this.profile = data[`${localId}`];
        this.displayName = this.profile.displayName;
      }, err => {
        this.error = err.message;
      });

    this.formAddTask = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      status: new FormControl('all')
    });
    this.getTask();
    this.status = 'all';
  }


  public getTask(): void {
    this.http.get<MyTask[]>(`${baseURL}tasks/${(this.idUrl)}.json`)
      .subscribe(tasks => {
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          this.tasks.push(task);
        }
      });
  };

  public addTask(): void {
    const task: MyTask = {
      id: this.formAddTask.value.id,
      title: this.formAddTask.value.title,
      description: this.formAddTask.value.description,
      date: this.formAddTask.value.date,
      status: this.formAddTask.value.status
    };

    this.http.post(`${baseURL}tasks/${(this.idUrl)}.json`, task)
      .subscribe(res => {
        this.tasks.push(task);
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
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.fireStore.remove(myTask, this.idUrl)
        .subscribe(() => {
          this.tasks = this.tasks.filter(t => t.id !== myTask.id);
        }, err => {
          this.error = err.message;
        });
      }
    });
  };

  public openDialog(myTask: MyTask): void {
    let dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '500px',
      data: myTask
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.tasks = [];
          this.getTask();
        }
      }, err => {
        this.error = err.message;
      });
  };

  public showSuccessActive(): void {
    this.toastrService.success('Your task has been added to active', 'Success');
  }

  public showSuccessDone(): void {
    this.toastrService.success('Your task is complete', 'Success');
  }

  public statusActive(myTask: MyTask): void  {
    this.showSuccessActive();
    this.fireStore.updateActiveStatus(myTask, this.idUrl, myTask.id)
      .subscribe(data => {
        this.fireStore.getTask(myTask, this.idUrl).subscribe(e => {
        }, err => {
          this.error = err.message;
        });
      }, err => {
        this.error = err.message;
      });
  };

  public statusDone(myTask: MyTask): void {
    this.showSuccessDone();
    this.fireStore.updateDoneStatus(myTask, this.idUrl, myTask.id)
      .subscribe(data => {
      }, err => {
        this.error = err.message;
      });
  };

  public filterActive(): void {
    this.fireStore.getTask(this.myTask, this.idUrl)
      .subscribe(tasks => {
        this.tasks = [];
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          if (task.status === 'active') {
            this.tasks.push(task);
          }
        }
      }, err => {
        this.error = err.message;
      });
  };


  public filterAll(): void {
    this.fireStore.getTask(this.myTask, this.idUrl)
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

  public filterDone(): void {
    this.fireStore.getTask(this.myTask, this.idUrl)
      .subscribe(tasks => {
        this.tasks = [];
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          if (task.status === 'done') {
            this.tasks.push(task);
          }
        }
      }, err => {
        this.error = err.message;
      });
  };

}
