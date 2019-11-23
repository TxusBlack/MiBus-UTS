import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {

  // Obtener posición de GPS, mostrarlo y enviarlo a Firebase
  public lat = 51.678418;
  public lng = 7.809007;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

}
