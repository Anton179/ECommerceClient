import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin-redirect-callback',
  template: ''
})
export class SigninRedirectCallbackComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    this._authService.finishLogin()
      .then(_ => {
        this._router.navigate(['/home'], {replaceUrl: true});
      });
  }

}
