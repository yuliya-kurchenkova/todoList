import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, NgModelGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { MyTask } from '../../shared/services/task';


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


  constructor(
    private route: ActivatedRoute,
    private fireStore: FirebaseService,
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
      date: new FormControl(this.data.date, [Validators.required])
    });
    this.route.queryParams.subscribe(url => {
      this.idUrl = url.id;
    },err => {
      this.error = err.message;
    });
};

  public close(): void {
    this.dialogRef.close();
  };

  public submit(form: NgModelGroup): void {
    if (form.invalid) return;
    console.log(this.data)
    this.fireStore.updateTask(form.value, this.idUrl, this.data.id)
      .subscribe(() => {
      },err => {
        this.error = err.message;
      });

    const updatedTodo = {
      ...this.data,
      ...form.value
    };
    console.log(updatedTodo)
    this.dialogRef.close(updatedTodo);

    };

}
