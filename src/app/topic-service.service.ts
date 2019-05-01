import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {Topics} from './model/Topics';
@Injectable({
  providedIn: 'root'
})
export class TopicServiceService {
  private topicURI='http://localhost:3000/apitopic/';
  constructor(private http: HttpClient) { }
  getAllTopicsBYCategory(name): Observable<Topics[]>{
    return this.http.get<Topics[]>(this.topicURI+""+name);
  }
  addTopic(topic:Topics):Observable<Topics>{
      return this.http.post<Topics>(this.topicURI+"addTopic",topic);
  }
}
