import {Component, ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router'
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
loading: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    router.events.subscribe((event: RouterEvent) => {
          this.navigationInterceptor(event);
      });
  }




      // Shows and hides the loading spinner during RouterEvent changes
      navigationInterceptor(event: RouterEvent): void {
          if (event instanceof NavigationStart) {
              this.loading = true;
          }
          if (event instanceof NavigationEnd) {
              this.loading = false;
          }

          // Set loading state to false in both of the below events to hide the spinner in case a request fails
          if (event instanceof NavigationCancel) {
              this.loading = false;
          }
          if (event instanceof NavigationError) {
              this.loading = false;
          }
      }


  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
}
