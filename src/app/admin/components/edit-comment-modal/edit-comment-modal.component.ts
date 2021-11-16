import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, NgModelGroup, Validators} from "@angular/forms";
import {FbCommentsService} from "../../shared/services/fbComments.service";

@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.scss']
})
export class EditCommentModalComponent implements OnInit {
  public formEditComment: FormGroup | any;
  isModelShow: boolean = false

  constructor(
    public dialogRef: MatDialogRef<EditCommentModalComponent>,
    public http: HttpClient,
    public fbComment: FbCommentsService,
    @Inject(MAT_DIALOG_DATA) public comment: any
  ) { }

  ngOnInit(): void {
    this.formEditComment = new FormGroup({
      newComment: new FormControl('', [Validators.required]),
    })
    console.log(this.comment)
  }

  public close(): void {
    this.isModelShow = true
  };

  public editComment(): void {
    // if (formEditComment.invalid) return;

    // this.fbComment.updateComment(formEditComment.value, (JSON.parse(localStorage.uid)))
    //   .subscribe(() => {
    //
    //   })
    const formEditComment = {
      newComment: this.formEditComment.value.newComment
    }

    this.dialogRef.close(formEditComment)

  }


}
