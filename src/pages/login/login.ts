import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private device: Device
  ) {
  }

  goToPage(page: string) {
    this.navCtrl.push(page);
  }

  ionViewDidLoad() {
   if (this.platform.is('cordova')) {
     const uuid = this.device.uuid;
     console.log('uuid', uuid);
   }
  }

}
