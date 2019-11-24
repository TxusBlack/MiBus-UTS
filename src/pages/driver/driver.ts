import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {
  }

  watchGps() {
    this.watch = this.geolocation.watchPosition().subscribe((gps) => {
      this.geo.lat = gps.coords.latitude;
      this.geo.lng = gps.coords.longitude;
    });
  }

  ionViewWillEnter() {
   this.watchGps();
  }

  ionViewDidLeave() {
    this.watch.unsubscribe();
  }

}
