import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Comments} from './model/Comments';
import {NumberStatus} from './model/NumberStatus';
declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  config = require('src/assets/config.json');
  private commentURI= this.config['api_connect'] + '/apicomment/';
  private numberStatusURI= this.config['api_connect'] + '/apiNumberStatus/';
  constructor(private http: HttpClient) { }
  getAllByCommnetByThreadID(name):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.commentURI+"getThreadid/"+name);
  }
  addComments(comments:Comments):Observable<Comments[]>{
    return this.http.post<Comments[]>(this.commentURI+"addComment",comments);
  }
  getAllCommentByCommentId(id,name):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.commentURI+"getCommentId/"+id+"/"+name);
  }
  deleteCommentById(id):void{
  this.http.delete(this.commentURI+"deleteCommentId/"+id).subscribe();
  }
  addNumberStatus(numberstatus:NumberStatus):Observable<NumberStatus[]>{
      return this.http.post<NumberStatus[]>(this.numberStatusURI+"addNumberStatus",numberstatus);
  }
  getNumberStatusByNameAndId(name:String,id:Number):Observable<NumberStatus[]>{
    return this.http.get<NumberStatus[]>(this.numberStatusURI+"getNumberStatusById/"+name+"/"+id);
  }
  updateButtonLike(id:any,name:any,sl:any):Observable<NumberStatus>{
    return this.http.put<NumberStatus>(this.numberStatusURI+"updateLikeButton/"+id+"/"+name+"/"+sl,{id,name,sl});
  }
  updateButtonLike1(id:any,name:any,sl:any):Observable<NumberStatus>{
    return this.http.put<NumberStatus>(this.numberStatusURI+"updateLikeButton1/"+id+"/"+name+"/"+sl,{id,name,sl});
  }
  updateButtonDislike(id:any,name:any,sl:any):Observable<NumberStatus>{
    return this.http.put<NumberStatus>(this.numberStatusURI+"updateDiskLikeButton/"+id+"/"+name+"/"+sl,{id,name,sl});
  }
  updateButtonDislike1(id:any,name:any,sl:any):Observable<NumberStatus>{
    return this.http.put<NumberStatus>(this.numberStatusURI+"updateDiskLikeButton1/"+id+"/"+name+"/"+sl,{id,name,sl});
  }
  getAllNumberStatusByCommentId(id:any):Observable<NumberStatus>{
    return this.http.put<NumberStatus>(this.numberStatusURI+"getNumberStatusByCommentId/"+id,id);
  }
  
}
