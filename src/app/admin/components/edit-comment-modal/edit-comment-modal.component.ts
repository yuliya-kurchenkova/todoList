import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.scss']
})
export class EditCommentModalComponent implements OnInit {
  public formEditComment: FormGroup | any;
  public isModelShow: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditCommentModalComponent>,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public comment: any
  ) { }

  public ngOnInit(): void {
    this.formEditComment = new FormGroup({
      newComment: new FormControl(this.comment.newComment, [Validators.required])
    })
  }

  public close(): void {
    this.isModelShow = true;
  };

  public editComment(): void {
    const formEditComment = {
      newComment: this.formEditComment.value.newComment,
      dateAddComment: new Date().toLocaleDateString()
    }
    this.dialogRef.close(formEditComment);
  }

}
