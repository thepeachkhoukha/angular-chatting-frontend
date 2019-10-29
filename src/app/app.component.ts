import { Component, ViewChild } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { WebSocketAPI } from './WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatting';
  messages: string[] = [];
  receivedMessages: string[] = [];
  webSocketAPI: WebSocketAPI;

  name: string;
  connected: boolean = false;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI();
    this.webSocketAPI.messageSent.subscribe(
      (message:string) =>{
        let content = JSON.parse(message);
        let msg = content["content"];
        this.messages.push(msg);
        console.log("send message "+ this.messages.length);
      }
    );

    /*this.webSocketAPI.messageReceived.subscribe(
      () =>{
        this.messages.push(this.name);
        console.log("send message "+ this.messages.length);
      }
    );*/
    /*this.webSocketAPI.messageReceived.subscribe(
      (message) => {
        let content = JSON.parse(message);
        this.greeting = content["content"];
        this.receivedMessages.push(this.greeting);
      });*/
  }

  connect(){
    this.webSocketAPI._connect();
    this.connected = true;
  }

  disconnect(){
    this.webSocketAPI._disconnect();
    this.connected = false;
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
    console.log("sendMessage: name: "+this.name);
  }

  handleMessage(message){
   /* 
  
    )*/
  }

}
