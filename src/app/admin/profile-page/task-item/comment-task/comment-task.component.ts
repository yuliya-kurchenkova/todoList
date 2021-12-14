import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-task',
  templateUrl: './comment-task.component.html',
  styleUrls: ['./comment-task.component.scss']
})
export class CommentTaskComponent {

  @Input() comment: any;
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  public editComment(): void {
    this.onEdit.emit(this.comment);
  }

  public deleteComment(): void {
    this.onDelete.emit(this.comment)
  }

}
