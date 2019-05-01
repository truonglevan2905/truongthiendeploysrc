import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3000');
  joinRoom(data)
  {
      this.socket.emit('join',data);
  }
  sendMessage(data)
  {
      this.socket.emit('message',data);
  }
  newMessageReceived(){
    // this.socket.on("newmessage",function(data){
    //   alert(data);
    // });
    let observable = new Observable<{threadid:Number,user:String, message:String}>(observer=>{
        this.socket.on("newmessage", (data)=>{
          alert(data);
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
 
}
  constructor() { }
}
