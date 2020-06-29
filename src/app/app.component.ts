import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: IonRouterOutlet[];
  networkTry: any;

  constructor(
    private alertController: AlertController,
    public toastController: ToastController,
    private network: Network,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router
  ) {
    this.initializeApp();
    this.backButtonEvent();

    this.network.onDisconnect().subscribe(() => {
      this.presentNoNetworkAlert();
    });


  }

  ngOnInit() { }



  async presentNoNetworkAlert() {
    const alert = await this.alertController.create({
      header: 'Network',
      message: 'Retry to connect',
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Retry',
          handler: () => {

            this.network.onConnect().subscribe(() => {
              alert.dismiss();
            });

            if (this.network.type != "none") {
              alert.dismiss();
            }
            else {
              return false;
            }


          }
        },


      ]


    });

    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.backgroundColorByHexString('#fff');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (this.router.url === '/home') {
          navigator['app'].exitApp();
        } else {
          this.router.navigateByUrl('/home');
        }
      });
    });
  }




}
