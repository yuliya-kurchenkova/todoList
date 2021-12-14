import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-comment-modal',
  templateUrl: './delete-comment-modal.component.html',
  styleUrls: ['./delete-comment-modal.component.scss']
})
export class DeleteCommentModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCommentModalComponent>
  ) { }

  public close(): void {
    this.dialogRef.close(true);
  };

  public cancel(): void {
    this.dialogRef.close(false);
  };
}
