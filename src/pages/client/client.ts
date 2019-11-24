import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  // Obtener todos los puntos y mostrarlos
  public lat = 6.5516271;
  public lng = -73.1337569;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

}
