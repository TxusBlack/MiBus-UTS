import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { Device } from "@ionic-native/device";

import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html",
  queries: {
    content: new ViewChild("content"),
  },
})
export class ChatPage {
  public messages = [];
  public newMsg = "";
  private uuid = '123';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private device: Device,
  ) {
  }

  async getChatMessages() {
    firebase.firestore().collection('chats').doc(this.uuid).collection('mensajes').orderBy("createdAt").limit(20).onSnapshot((snapshot: any) => {
      snapshot.docChanges().forEach((element: any) => {
        const data = {
          myMsg: this.uuid === element.doc.data().from,
          ...element.doc.data()
        }
        if (element.doc.data().createdAt) {
          this.messages.push(data);
        }
      });
    });
  }

  sendMessage() {
    const obj = {
      msg: this.newMsg,
      myMsg: true,
      from: this.uuid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    firebase.firestore().collection('chats').doc(this.uuid).collection('mensajes').add(obj).then((res) => {
      this.newMsg = '';
    });
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.uuid = this.device.uuid;
    } else {
      this.uuid = '123';
    }
    this.getChatMessages();
  }
}
