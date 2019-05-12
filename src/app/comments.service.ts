import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Comments} from './model/Comments';

declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  config = require('src/assets/config.json');
  private commentURI= this.config['api_connect'] + '/apicomment/';
  constructor(private http: HttpClient) { }
  getAllByCommnetByThreadID(name):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.commentURI+"getThreadid/"+name);
  }
  addComments(comments:Comments):Observable<Comments[]>{
    return this.http.post<Comments[]>(this.commentURI+"addComment",comments);
  }
  getAllCommentByCommentId(id,name):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.commentURI+""+id+"/"+name);
  }
  deleteCommentById(id):void{
  this.http.delete(this.commentURI+"deleteCommentId/"+id).subscribe();
  }
  
}
