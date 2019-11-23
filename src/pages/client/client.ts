import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  // Obtener todos los puntos y mostrarlos
  public lat = 51.678418;
  public lng = 7.809007;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

}
