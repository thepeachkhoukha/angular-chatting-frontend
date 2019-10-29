import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';
import { Output, EventEmitter } from '@angular/core';


export class WebSocketAPI{
    webSocketEndPoint: string = 'http://localhost:6060/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    

    //@Output() messageReceived = new EventEmitter<{}>();
    @Output() messageSent = new EventEmitter<string>();
    constructor(){
    }

    _connect(){
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        this.stompClient.connect({}, function(frame){
            _this.stompClient.subscribe(_this.topic, function(sdkEvent){
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    }

    _disconnect(){
        if(this.stompClient!== null){
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }
    /**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message){
        console.log("calling lougout api via web socket");
        this.stompClient.send("/app/hello", function(){this.messageSent.emit(message)}, JSON.stringify(message))
        //this.messageSent.emit(message);
    }

    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    onMessageReceived(message) {
        console.log("inside onMessageReceived");
        this.messageSent.emit(message.body);
        //this.messageReceived.emit(message.body);
    }
}