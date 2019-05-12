import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Threads} from './model/Threads';
import {Thread} from 'models/Threads';
import {Emails} from 'models/Emails';
import * as io from 'socket.io-client';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  config = require('src/assets/config.json');
  private threadURI = this.config['api_connect'] + '/apithread/';
  private emailURI = this.config['api_connect'] + '/sendEmail/';
  private EMAILURI= this.config['api_connect'] + '/apimail/';
  private commentURI= this.config['api_connect'] + '/apicomment/';
  threads:Thread[]=[];
  private socket = io(this.config['api_connect']);
 getAllTheardByNameTopic(name):Observable<Thread[]>{
   return this.http.get<Thread[]>(this.threadURI+""+name);
 }
  constructor(private http: HttpClient) { }
  search(key: string): Observable<any> {
    return this.http.get(`${this.threadURI}search/${key}`);
  }
  addThread(thread:Thread): any{
    return this.http.post<Thread>(this.threadURI+"addThread",thread);
  }
  checkThreads():Observable<Thread>{
    return this.http.get<Thread[]>(this.threadURI+"getThreadAuthen");
  }
  updateStatusThreads(id:String):Observable<Thread>{
    return this.http.put<Thread>(this.threadURI+"updateThread/"+id,id);
  }
  updateNewOfViews(id:String,value:String):Observable<Thread>{
    return this.http.put<Thread>(this.threadURI+"updateNewofView/"+id+"/"+value,{id,value});
  }
  sendEmail(content,receiver):Observable<any>{
    return this.http.post<any>(this.emailURI,content,receiver);
  }
  addEmail(email:Emails):Observable<Emails>{
    return this.http.post<Emails>(this.EMAILURI+"addEmail",email);
  }
  getAllEmailByUser(name:String):Observable<Emails>{
    return this.http.get<Emails>(this.EMAILURI+"getByUserName/"+name);
  }
  getAllThreadByThreadId(threadid:String):Observable<Thread>{
    return this.http.get<Thread[]>(this.threadURI+"getThreadById/"+threadid);
  }
  getAllThreadsByUsername(userName: string, pageIndex: number, pageSize: number): Observable<Thread>{
    return this.http.get(`${this.threadURI}searchByUserName/${userName}?pageSize=${pageSize.toString()}&pageIndex=${pageIndex.toString()}`)
  }
  sendMessage(data)
  {
      this.socket.emit('createhopthu',data);
  }
  deleteTheadId(name){
     return this.http.delete(this.threadURI+"delete/"+name).subscribe();
  }
  newMessageReceivedHopThu(){
    this.socket.on("newhopthu",function(data){
        

    }
    )
    // let observable = new Observable<{username:String, topicname:String, text:String, ngay:String}>(observer=>{
    //     this.socket.on('newhopthu', (data)=>{
    //       alert(data);
    //         observer.next(data);
           
    //     });
    //     return () => {this.socket.disconnect();}
    // });

    // return observable;
}
}
