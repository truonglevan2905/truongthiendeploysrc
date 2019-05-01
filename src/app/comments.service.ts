import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Comments} from './model/Comments';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentURI='http://localhost:3000/apicomment/';
  constructor(private http: HttpClient) { }
  getAllByCommnetByThreadID(name):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.commentURI+"getThreadid/"+name);
  }
  addComments(comments:Comments):Observable<Comments[]>{
    return this.http.post<Comments[]>(this.commentURI+"addComment",comments);
  }
}
