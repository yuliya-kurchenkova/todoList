import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, NgModelGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { MyTask } from '../../shared/services/task';
import {baseURL} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-edit-task-modal',
  templateUrl:'/edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  public form: FormGroup | any;
  public idUrl!: string;
  public date: Date = new Date();
  public error: string = '';
  public myTask = new MyTask();
  public uidCurrent!: string;
  isModelShow: boolean = false
  favoriteSeason!: string;
  public status: string = 'new'

  constructor(
    private route: ActivatedRoute,
    private fireStore: FirebaseService,
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public ngOnInit(): void {
    if(localStorage.getItem('uid')) {
      let uidCurrent = JSON.parse(localStorage.uid)
      console.log(uidCurrent)

    }
    this.status = 'new';
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
      date: new FormControl(this.data.date, [Validators.required]),
      status:  new FormControl(this.data.status)
    });
    // this.route.queryParams.subscribe(url => {
    //   this.idUrl = url.id;
    // },err => {
    //   this.error = err.message;
    // });
};

  seasons: string[] = ['New', 'In process', 'Completed'];

  public close(): void {
    this.isModelShow = true
  };

  // statusInProcess(myTask: MyTask) {
  //   this.fireStore.updateActiveStatus(myTask,  JSON.parse(localStorage.uid), this.data.id)
  //     .subscribe(data => {
  //       this.fireStore.getTask(myTask,  JSON.parse(localStorage.uid)).subscribe(e => {
  //       }, err => {
  //         this.error = err.message;
  //       });
  //     }, err => {
  //       this.error = err.message;
  //     });
  // }

  public submit(form: NgModelGroup): void {
    if (form.invalid) return;
    console.log(this.data)
    console.log(form.value)
    this.fireStore.updateTask(form.value, (JSON.parse(localStorage.uid)), this.data.id)
      .subscribe(() => {
      },err => {
        this.error = err.message;
      });
    // this.http.get(`${baseURL}tasks/${(JSON.parse(localStorage.uid))}.json`)
    //   .subscribe(data => {
    //     console.log(data)
    //   })
    const updatedTodo = {
      ...this.data,
      ...form.value
    };
    console.log(updatedTodo)
    this.dialogRef.close(updatedTodo);

    };

}
