import { Component,OnInit } from '@angular/core';
import { User, Task, Comment } from '../../shared/interfaces/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/services/firebase.service';
import { EditTaskModalComponent } from '../components/edit-task-modal/edit-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskModalComponent } from '../components/delete-task-modal/delete-task-modal.component';
import {MyComment, MyTask} from '../shared/services/task';
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
  public profile!: any;
  public displayName: any;
  public error: string = '';
  public value: string = '';
  public formAddTask!: FormGroup;
  public tasks: Task[] = [];
  public comments: Comment[] = [];
  public status: string = 'new'
  public key!: string
  public myTask = new MyTask()
  public t: any;
  public selected: number = 1;
  public currentTask: any;
  visibility: boolean = true;
  public newTasks: any;
  public inProcessTasks: any;
  public doneTasks: any;
  // public comments: string = 'No comments'
  public formAddComment!: FormGroup;
  // public taskComment: any[] = [];
  // public idTask!: string;
  public idTask!: unknown[];
  // public showComments: boolean = false
  // private textComment: any;
  // private commentValue: any;
  public searchStr: string | any
  now = new Date();
// a: any
//   b: any


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fireStore: FirebaseService,
    private dialog: MatDialog,
    // private fbComment: FbCommentsService
    // private toastrService: ToastrService
  ) { }


  public ngOnInit(): void {
    if(localStorage.getItem('uid')) {
      let uidCurrent = JSON.parse(localStorage.uid)
      console.log(uidCurrent)
      this.http
        .get<MyTask[]>(`${baseURL}users/${uidCurrent}.json`)
        .subscribe((data: any) => {
          let localId = Object.keys(data)[0];
          this.profile = data[`${localId}`];
          this.displayName = this.profile.displayName;
        });
      this.getTask();
      // this.getComment()
      this.status = 'new';
    }

    this.formAddTask = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      status: new FormControl('new'),
    });
    console.log(this.formAddTask.value)

    // this.formAddComment = new FormGroup({
    //   newComment: new FormControl(null, [Validators.required])
    // })
    // console.log(this.formAddComment)
  }


  sortFunc () {
  this.tasks.sort((a: Task, b: Task) => {
    console.log('ssssss', this.tasks)
    let dateSplitA = a.dateAdd.split(".")
    let dateSplitB = b.dateAdd.split(".")
    // console.log(dateSplit)
    let dateTimeStampA = new Date(+dateSplitA[2], +dateSplitA[1] - 1, +dateSplitA[0]).getTime()
    let dateTimeStampB = new Date(+dateSplitB[2], +dateSplitB[1] - 1, +dateSplitB[0]).getTime()
    console.log(dateTimeStampA)
    console.log(dateTimeStampB)
    let ss = dateTimeStampA - dateTimeStampB
    return -ss

  })
  }

  sortFunc2() {
    this.tasks.sort((a: Task, b: Task) => {
      console.log('ssssss', this.tasks)
      let dateSplitA = a.dateAdd.split(".")
      let dateSplitB = b.dateAdd.split(".")
      // console.log(dateSplit)
      let dateTimeStampA = new Date(+dateSplitA[2], +dateSplitA[1] - 1, +dateSplitA[0]).getTime()
      let dateTimeStampB = new Date(+dateSplitB[2], +dateSplitB[1] - 1, +dateSplitB[0]).getTime()
      console.log(dateTimeStampA)
      console.log(dateTimeStampB)
      let ss = dateTimeStampB - dateTimeStampA
      return -ss

    })
  }

  public getTask(): void {
    this.http.get<MyTask[]>(`${baseURL}tasks/${( JSON.parse(localStorage.uid))}.json`)
      .subscribe(tasks => {
        for (let key in tasks) {
          let task = tasks[key];
          task.id = key;
          // this.getComment(task.id)
          this.tasks.push(task);
        }
      });
  };

  public addTask(): void {
    const myTask: MyTask = {
      id: this.formAddTask.value.id,
      title: this.formAddTask.value.title,
      description: this.formAddTask.value.description,
      date: this.formAddTask.value.date.toLocaleDateString(),
      status: this.formAddTask.value.status,
      newComment: this.formAddTask.value.newComment,
      dateAdd: new Date().toLocaleDateString()
    };
    console.log(myTask.dateAdd)
    this.fireStore.addTask(myTask, ( JSON.parse(localStorage.uid)))
      .subscribe(res => {
        console.log(res)
        // let idTask = Object.values(res)
        // console.log(idTask)
        this.tasks.push(myTask);
        // console.log(myTask)
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
       this.fireStore.remove(myTask,  JSON.parse(localStorage.uid))
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
    console.log(myTask)
    this.currentTask = myTask;
    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log(result)
        if (result) {
          this.tasks = [];
          this.getTask();
        }
      }, err => {
        this.error = err.message;
      });
  };

  // public showSuccessActive(): void {
  //   this.toastrService.success('Your task has been added to active', 'Success');
  // }

  // public showSuccessDone(): void {
  //   this.toastrService.success('Your task is complete', 'Success');
  // }
  //


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
