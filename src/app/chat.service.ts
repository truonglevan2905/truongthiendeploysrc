import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Groups} from './model/Groups';
import {GroupUser} from './model/GroupUser';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  config = require('src/assets/config.json');
  private groupURI= this.config['api_connect'] + '/apigroup/';
  private groupUserURI= this.config['api_connect'] + '/apigroupuser/';
 constructor(private http: HttpClient) { }

addGroup(group:Groups):Observable<Groups[]>{
 return this.http.post<Groups[]>(this.groupURI+"addGroup",group);
}
getAllGroupName():Observable<Groups[]>{
 return this.http.get<Groups[]>(this.groupURI+"getgroup");
}
addGroupUser(group:GroupUser):Observable<GroupUser[]>{
 return this.http.post<GroupUser[]>(this.groupUserURI+"addgroupuser",group);
}
getAllGroupUser(name:String):Observable<GroupUser[]>{
 return this.http.get<GroupUser[]>(this.groupUserURI+"getUserOnlineByGroup/"+name);
}
getAllUserInGroup(namegroup:String,name:String):Observable<GroupUser[]>{
  return this.http.get<GroupUser[]>(this.groupUserURI+"getUserOnline/"+namegroup+"/"+name);
}
}
