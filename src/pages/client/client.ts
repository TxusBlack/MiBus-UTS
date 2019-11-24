import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  // Obtener todos los puntos y mostrarlos
  public lat = 6.5516271;
  public lng = -73.1337569;
  public buses = [];
  public iconBus = {
    url: '../../assets/imgs/pin-bus.png',
    scaledSize: {height: 40, width: 40},
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  async ionViewWillEnter() {
    console.log('Will Enter');
    const snapshot = await firebase.firestore().collection('usuarios').get();
    if (!snapshot.empty) {
      snapshot.forEach(buses => {
        this.buses.push(buses.data());
        console.log(this.buses);
      });
    }
  }

}
