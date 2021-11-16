import {Injectable} from "@angular/core";
import { baseURL } from '../../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {MyComment, MyTask} from "./task";
import {Observable} from "rxjs";
import {Task} from "../../../shared/interfaces/interfaces";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class FbCommentsService {

  constructor(private http: HttpClient) {
  }


  public addComment(myComment: MyComment, uid: string, id: any): Observable<any> {
    return this.http.post<any>(`${baseURL}comments/${uid}/${id}.json`, myComment)
      .pipe(map(res => {
        return {...myComment, id: res.name};
      }));
  }

  public removeComment(myComment: MyComment, uid: string, id: any, commentId: any): Observable<any> {
    return this.http.delete(`${baseURL}comments/${uid}/${id}/${commentId}.json`);
  };

  public updateComment(myComment: MyComment, uid: string, id: string, commentId: any): Observable<any> {
    return this.http.put(`${baseURL}comments/${uid}/${id}/${commentId}.json`, myComment)
      .pipe(map(res => {
        console.log(res)
        // return {...myComment, id: res.name};
      }));
  };
}
