import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Threads} from './model/Threads';
import {Thread} from 'models/Threads';
import {Emails} from 'models/Emails';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private threadURI = 'http://localhost:3000/apithread/';
  private emailURI ='http://localhost:3000/apimail/sendEmail';
  private EMAILURI='http://localhost:3000/apimail/';
  threads:Thread[]=[];
  private socket = io('http://localhost:3000');
 getAllTheardByNameTopic(name):Observable<Thread[]>{
   return this.http.get<Thread[]>(this.threadURI+""+name);
 }
  constructor(private http: HttpClient) { }
  search(key: string, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.threadURI}search/${key}?pageSize=${pageSize.toString()}&pageIndex=${pageIndex.toString()}`);
  }
  addThread(thread:Thread):Observable<Thread>{
    return this.http.post<Thread>(this.threadURI+"addThread",thread);
  }
  checkThreads():Observable<Thread>{
    return this.http.get<Thread[]>(this.threadURI+"getThreadAuthen");
  }
  updateStatusThreads(id:String):Observable<Thread>{
    return this.http.put<Thread>(this.threadURI+"updateThread/"+id,id);
  }
  sendEmail(receiver,content):Observable<any>{
    return this.http.post<any>(this.emailURI,receiver,content);
  }
  addEmail(email:Emails):Observable<Emails>{
    return this.http.post<Emails>(this.EMAILURI+"addEmail",email);
  }
  getAllEmailByUser(name:String):Observable<Emails>{
    return this.http.get<Emails>(this.EMAILURI+"getByUserName/"+name);
  }
  getAllThreadsByUsername(userName: string, pageIndex: number, pageSize: number): Observable<Thread>{
    return this.http.get(`${this.threadURI}searchByUserName/${userName}?pageSize=${pageSize.toString()}&pageIndex=${pageIndex.toString()}`)
  }
  sendMessage(data)
  {
      this.socket.emit('createhopthu',data);
  }
  newMessageReceivedHopThu(){
    this.socket.on("newhopthu",function(data){
        alert(data);

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
