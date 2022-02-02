import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs';
import { Device } from '@ionic-native/device';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {

  // Obtener posición de GPS, mostrarlo y enviarlo a Firebase
  public geo = {
    lat: null,
    lng: null
  }
  private watch: Subscription;
  public uuid;
  public iconBus = {
    url: '../../assets/imgs/pin-bus.png',
    scaledSize: {height: 40, width: 40},
  };
  public isSendingToServer = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private platform: Platform,
    private device: Device,
    private toastCtrl: ToastController
  ) {
  }

  async saveGps(lat, lng) {
    // Registro tiempo real
    await firebase.firestore().collection('usuarios').doc(this.uuid).update({
      lat: lat,
      lng: lng,
      isOnline: this.isSendingToServer
    });
    // Registro histórico
    await firebase.firestore().collection('historial').doc(this.uuid).collection("registros").add({
      lat: lat,
      lng: lng,
      timestamp: Math.round(+new Date()/1000), // unix format
    }).catch(err => console.log('err', err));
  }

  goToChatPage() {
    this.navCtrl.push("ChatPage");
  }

  watchGps() {
    this.watch = this.geolocation.watchPosition().subscribe(async (gps) => {
      this.geo.lat = gps.coords.latitude;
      this.geo.lng = gps.coords.longitude;
      if (this.isSendingToServer) {
        this.saveGps(this.geo.lat,  this.geo.lng).then(() => {
          this.toastCtrl.create({
            message: 'Se enviaron los datos al servidor',
            duration: 1000
          }).present();
        });
      }
    });
  }

  toggleSendData() {
    this.isSendingToServer = !this.isSendingToServer;
  }

  async checkIfUserIsActive() {
    const fb = firebase.firestore();
    const snapshot = await fb.collection('usuarios').doc(this.uuid).get();
    const user = snapshot.data();
    if (!user.isActive) {
      return alert("El usuario no está activo.")
    } else {
      return this.watchGps();
    }
  }

  ionViewWillEnter() {
    this.checkIfUserIsActive();
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.uuid = this.device.uuid;
      console.log('uuid', this.uuid);
    } else {
      this.uuid = '123';
    }
  }

  ionViewDidLeave() {
    if (this.watch) {
      this.watch.unsubscribe();
    }
  }

}
