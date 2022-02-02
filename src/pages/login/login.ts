import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
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
  public isActive = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private device: Device,
    private toastCtrl: ToastController
  ) {
  }

  goToPage(page: string) {
    this.navCtrl.setRoot(page);
  }

  async setDocumentDriver() {
    const fb = firebase.firestore();
    const snapshot = await fb.collection('usuarios').doc(this.uuid).get();
    if (!snapshot.exists) {
      await fb.collection('usuarios').doc(this.uuid).set({
        uuid: this.uuid,
        isActive: true,
      });
    }
    return this.goToPage('DriverPage');
  }

  async checkLiscence() {
    const fb = firebase.firestore();
    const snapshot = await fb.collection('config').doc("1").get();
    const config = snapshot.data();
    this.isActive = config.isActive;
    if (!config.isActive) {
      return alert("La licencia de la app no está activa");
    } else {
      return this.toastCtrl.create({
        message: "La licencia de la app ha sido configurada exitosamente",
        duration: 1000
      }).present();
    }
  }

  ionViewDidLoad() {
    this.checkLiscence();
    if (this.platform.is('cordova')) {
      this.uuid = this.device.uuid;
      console.log('uuid', this.uuid);
    } else {
      this.uuid = '123';
    }
  }

}
