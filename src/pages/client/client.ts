import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  // Obtener todos los puntos y mostrarlos
  public buses = [];
  public iconBus = {
    url: '../../assets/imgs/pin-bus.png',
    scaledSize: {height: 40, width: 40},
  };

  private watch: Subscription
  public geo = {
    lat: null,
    lng: null
  };
  public iconPerson = {
    url: '../../assets/imgs/person.png',
    scaledSize: {height: 30, width: 30},
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {
  }

  watchGps() {
    this.watch = this.geolocation.watchPosition().subscribe(async (gps) => {
      this.geo.lat = gps.coords.latitude;
      this.geo.lng = gps.coords.longitude;
      console.log('GPS');
    });
  }

  async getData() {
    const snapshot = await firebase.firestore().collection('usuarios').get();
    if (!snapshot.empty) {
      snapshot.forEach(buses => {
        this.buses.push(buses.data());
        console.log(this.buses);
      });
    }
  }

  ionViewWillEnter() {
    this.getData();
    this.watchGps();
  }

  ionViewDidLeave() {
    this.watch.unsubscribe();
  }

}
