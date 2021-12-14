import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, NgModelGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public uidCurrent!: string;
  public isModelShow: boolean = false
  public status: string = 'new'

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
      date: new FormControl(this.data.date, [Validators.required]),
      status:  new FormControl(this.data.status)
    });
  };

  public close(): void {
    this.isModelShow = true
  };

  public submit(form: NgModelGroup): void {
    if (form.invalid) return;

    const myTask: MyTask = {
      id: this.data.id,
      title: this.form.value.title,
      description: this.form.value.description,
      date: this.form.value.date,
      status: this.form.value.status,
      newComment: this.form.value.newComment,
      dateAdd: new Date().toLocaleDateString()
  }

    this.dialogRef.close(myTask);
  };

}
