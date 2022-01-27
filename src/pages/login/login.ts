import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public uuid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private device: Device
  ) {
  }

  goToPage(page: string) {
    this.navCtrl.push(page);
  }

  async setDocumentDriver() {
    const fb = firebase.firestore();
    const snapshot = await fb.collection('usuarios').doc(this.uuid).get();
    if (snapshot.exists) {
      this.goToPage('DriverPage');
    } else {
      await fb.collection('usuarios').doc(this.uuid).set({
        uuid: this.uuid
      });
      this.goToPage('DriverPage');
    }
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.uuid = this.device.uuid;
      console.log('uuid', this.uuid);
    } else {
      this.uuid = '123';
    }
  }

}
