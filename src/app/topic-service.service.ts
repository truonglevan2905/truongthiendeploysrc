import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {Topics} from './model/Topics';
import { Topic } from './model/Topic';

declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class TopicServiceService {
  config = require('src/assets/config.json');
  private topicURI= this.config['api_connect'] + '/apitopic/';
  constructor(private http: HttpClient) { }
  getAllTopicsBYCategory(name): Observable<Topics[]>{
    return this.http.get<Topics[]>(this.topicURI+"getTopicByCategory/"+name);
  }
  addTopic(topic:Topics):Observable<Topics>{
      return this.http.post<Topics>(this.topicURI+"addTopic",topic);
  }
  updateTopicNewOfViews(name:String,sl:Number):Observable<Topics>{
    return this.http.put<Topics>(this.topicURI+"updateNumberofView/"+name+"/"+sl,{name,sl});
  }
  getAllTopicByName(name:String):Observable<Topics[]>{
    return this.http.get<Topics[]>(this.topicURI+"getAllTopicByName/"+name);
  }
}
