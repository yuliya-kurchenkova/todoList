import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyComment, MyTask } from '../../shared/services/task';
import { baseURL } from '../../../../environments/environment';
import { DeleteCommentModalComponent } from '../../components/delete-comment-modal/delete-comment-modal.component';
import { EditCommentModalComponent } from '../../components/edit-comment-modal/edit-comment-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../../shared/interfaces/interfaces';
import { FbCommentsService } from '../../shared/services/fbComments.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task | any;
  @Output() onDel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  public formAddComment!: FormGroup;
  public textComment: any;
  public commentValue: any;
  public comments: Comment[] = [] ;
  public error: string = '';
  public currentTask: any;
  public showComments: boolean = false;
  public myComment!: MyComment;
  public condition: boolean = true;

  constructor(
    private http: HttpClient,
    private fbComment: FbCommentsService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.formAddComment = new FormGroup({
      newComment: new FormControl(null, [Validators.required]),
    })
    this.getComment();

  }
  public toggle(): void{
    this.showComments=!this.showComments;
  }

  public delTask(): void {
    this.onDel.emit(this.task);
  }

  public editTask(): void {
    this.onEdit.emit(this.task);
  }

  public getComment(): void {
    this.http.get<any>(`${baseURL}comments/${( JSON.parse(localStorage.uid))}/${this.task.id}.json`)
      .subscribe(comments => {
        this.comments = []
        for (let key in comments) {
          let task = comments[key];
          task.id = key
          this.comments.push(task)
        }
      });
  };

  public addComment(myTask: MyTask): void {
    const myComment: MyComment = {
      newComment: this.formAddComment.value.newComment,
      id: this.formAddComment.value.id,
      dateAddComment: new Date().toLocaleDateString()
    };

    this.fbComment.addComment(myComment, ( JSON.parse(localStorage.uid)), myTask.id)
      .subscribe(res => {
        this.comments.push(res)
        this.formAddComment.reset();
      }, err => {
        this.error = err.message;
      });
  };

  public removeComment(myComment: MyComment): void {
    let dialogRef = this.dialog.open(DeleteCommentModalComponent, {
      width: '500px',
      data: myComment
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fbComment.removeComment(this.myComment,  (JSON.parse(localStorage.uid)), this.task.id, myComment.id)
          .subscribe(() => {
            this.getComment()
          }, err => {
            this.error = err.message;
          });
      }
    });
  };

  public openCommentDialogEdit(myComment: MyComment): void {
    let dialogRef = this.dialog.open(EditCommentModalComponent, {
      width: '400px',
      data: myComment
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.fbComment.updateComment(result, JSON.parse(localStorage.uid), this.task.id, myComment.id)
            .subscribe( () => {
              this.getComment();
            });
        }
      }, err => {
        this.error = err.message;
      });
  };

}
