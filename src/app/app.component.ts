import { Component,OnInit,ViewChildren, QueryList  } from '@angular/core';
import { Router } from '@angular/router';
import { Platform,IonRouterOutlet  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: IonRouterOutlet[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  ngOnInit() { }


  initializeApp() {
    this.platform.ready().then(() => {
     
      this.statusBar.backgroundColorByHexString('#000000');
      this.statusBar.styleLightContent();
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
