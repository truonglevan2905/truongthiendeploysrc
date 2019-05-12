import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Threads} from './model/Threads';


declare var require: any;


@Injectable({
  providedIn: 'root'
})
export class TopicDetailService {
  config = require('src/assets/config.json');
  private topicURI= this.config['api_connect'] + '/apithread/';
 
      getAllTheardByNameTopic(name,notify,auth):Observable<Threads[]>{
        return this.http.get<Threads[]>(this.topicURI+"getThread/"+name+"/"+notify+"/"+auth);
      }
     getAllThreadById(id):Observable<Threads[]>{
       return this.http.get<Threads[]>(this.topicURI+"getThreadById/"+id);
     }
  constructor(private http: HttpClient
    
    ) { 
      
    }
}
