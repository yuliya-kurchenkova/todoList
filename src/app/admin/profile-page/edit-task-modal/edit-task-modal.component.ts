import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../../shared/interfaces/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {FirebaseService} from "../../shared/services/firebase.service";
import {switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  @Input()stream$: Subject<Task> | any;

  public formAddTask1: FormGroup | any;
  task: Task | any;
  public idUrl!: string;
  public tasks: Task[] = [];
  public taskOne: any;
  public key: any;
  public obj!: any;
  private objTitle: any;
  public dt: any;



  constructor( private route: ActivatedRoute,
               private fireStore: FirebaseService,
               private http: HttpClient
  ) { }
  //
  // ngOnInit(): void {
  //   console.log(this.route.params)
  //   this.route.params
  //     .pipe(switchMap( (params: Params) => {
  //       return this.fireStore.getById(params['id']);
  //     }))
  //     .subscribe( (task: Task) => {
  //       this.task = task;
  //       this.formAddTask = new FormGroup({
  //         title: new FormControl( task.title, Validators.required ),
  //         text: new FormControl( task.description, Validators.required )
  //       });
  //     });
  // }
  // public id!: string;



  ngOnInit(): void {
    console.log(this.task)
    console.log('cccc')
    this.stream$.subscribe((task: any) => {
      console.log(task)
    })
    this.route.queryParams.subscribe(url => {
      this.idUrl = url.id;
    })
    this.http
      .get<Task>(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${this.idUrl}.json`)
      .subscribe((tasks: any) => {
        console.log(tasks)
            for (let key in tasks) {
              let taskOne = tasks;
              console.log(taskOne[key])
              let taskTitle = taskOne[key]
              console.log(taskTitle)
              let taskOOO = taskTitle.title
              console.log(taskOOO)

              console.log(taskOne.title)
              this.formAddTask1 = new FormGroup({
                title: new FormControl(this.task.title, [Validators.required]),
                description: new FormControl(this.task.description, [Validators.required])
              });
            }
        console.log(tasks)
        this.obj = Object.keys(tasks)[0];
        console.log(this.obj)
        console.log(tasks[this.obj])
        let dd = tasks[this.obj]
        console.log(dd)
        this.dt = dd.title
        console.log(this.dt)
        let objDescription = this.obj.description
      })
    // this.formAddTask1 = new FormGroup({
    //   title: new FormControl(this.dt, [Validators.required]),
    //   description: new FormControl('', [Validators.required])
    // });
    //     for (let key in tasks) {
    //       let taskOne = tasks[key];
    //       console.log(taskOne.title)
    //
    //       // taskOne.title = key;
    //       console.log(key)
    //       let obj = Object.values(taskOne);
    //       // console.log(obj[key])
    //       // let objTitle = obj.title
    //     }
    //     // this.task = tasks
    //     // let obj = Object.values(tasks)[0];
    //     // console.log(obj)
    //     // let objTitle = obj.title
    //     // let objDescription = obj.description
    //     // console.log(objTitle)
    //     // console.log(objDescription)

    // const task: Task = {
    //   id: this.formAddTask.value.id,
    //   title: this.formAddTask.value.title,
    //   description: this.formAddTask.value.description,
    //   date: this.formAddTask.value.date
    // };

    //   })
  }

  submit() {
   this.fireStore.updateTask({
     ...this.task,
     id: this.formAddTask1.id,
     title: this.formAddTask1.title,
     description: this.formAddTask1.description
   }, this.idUrl, this.obj)
     .subscribe(e => {
       console.log(e.title)
       console.log(e.description)
     })
  }

}
