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
    return await firebase.firestore().collection('usuarios').doc(this.uuid).set({
      uuid: this.uuid,
      lat: lat,
      lng: lng
    });
  }

  watchGps() {
    this.watch = this.geolocation.watchPosition().subscribe(async (gps) => {
      this.geo.lat = gps.coords.latitude;
      this.geo.lng = gps.coords.longitude;
      this.saveGps(this.geo.lat,  this.geo.lng).then(() => {
        this.toastCtrl.create({
          message: 'Se enviaron los datos al servidor',
          duration: 1000
        }).present();
      });
    });
  }

  ionViewWillEnter() {
   this.watchGps();
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
    this.watch.unsubscribe();
  }

}
