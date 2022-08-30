import { APP_ROUTES } from './../core/app-routes';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENVIRONMENT } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(x => {
      if (x.code) {
        this._authService.authenticate(x.code as string)
        .subscribe(() => this._router.navigate([APP_ROUTES.statistics]));
      }
    });
  }

  public login(): void {
    document.location.href = `${ENVIRONMENT.identityUrl}/authorize?client_id=${ENVIRONMENT.clientId}`;
  }
}
