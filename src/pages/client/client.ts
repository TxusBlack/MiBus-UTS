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
    });
  }

  async getData() {
    firebase.firestore().collection('usuarios').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        snapshot.docChanges().forEach(buses => {
          if (buses.type === 'added') {
            this.buses.push(buses.doc.data());
          }
          if (buses.type === 'modified') {
            this.buses[buses.newIndex] = buses.doc.data();
          }
          if (buses.type === 'removed') {
            this.buses = this.buses.filter((obj) => {
              return obj.uuid !== buses.doc.data().uuid;
            });
          }
        });
      }
    });
  }

  ionViewWillEnter() {
    this.getData();
    this.watchGps();
  }

  ionViewDidLeave() {
    this.watch.unsubscribe();
  }

}
