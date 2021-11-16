import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-comment-modal',
  templateUrl: './delete-comment-modal.component.html',
  styleUrls: ['./delete-comment-modal.component.scss']
})
export class DeleteCommentModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCommentModalComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any)
  ) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close(true);
  };

  public cancel(): void {
    this.dialogRef.close(false);
  };
}
