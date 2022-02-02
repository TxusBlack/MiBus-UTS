import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { Observable } from "rxjs";

import * as firebase from 'firebase';
import { Device } from "@ionic-native/device";

@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html",
  queries: {
    content: new ViewChild("content"),
  },
})
export class ChatPage {
  messages: Observable<any[]>;
  newMsg = "";
  uuid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private device: Device,
  ) {}

  async getChatMessages() {
    firebase.firestore().collection('chats').doc(this.uuid).collection('mensajes').onSnapshot((snapshot) => {
      // this.messages = snapshot.docChanges().values;
      console.log('snapshot.docChanges().values', snapshot.docChanges().values)
    })
  }

  ngOnInit() {
    // this.messages = this.chatService.getChatMessages();
  }

  sendMessage() {
    // this.chatService.addChatMessage(this.newMsg).then(() => {
    //   this.newMsg = "";
    //   this.content.scrollToBottom();
    // });
  }

  signOut() {
    // this.chatService.signOut().then(() => {
    //   this.router.navigateByUrl("/", { replaceUrl: true });
    // });
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.uuid = this.device.uuid;
    } else {
      this.uuid = '123';
    }
    alert("Página en construcción")
  }
}
