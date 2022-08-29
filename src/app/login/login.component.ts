
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    // console.log(this._activatedRoute.snapshot.params);
    // console.log(this._activatedRoute.snapshot.paramMap);
    // console.log(this._router.url,);
    // console.log(this._router.getCurrentNavigation()?.extras);
    this._activatedRoute.queryParams.subscribe(x => {
      if (x.code) {
        this._authService.login(x.code as string).subscribe();
      }
      
    });
    this._activatedRoute.queryParamMap.subscribe(x => console.log('map', x));
  }

  public login(): void {
    // eslint-disable-next-line max-len
    document.location.href = 'https://github.com/login/oauth/authorize?client_id=c5efff1b130aa5f84516&redirect_uri=http://localhost:4200/login';
    // window.open('https://github.com/login/oauth/authorize?client_id=c5efff1b130aa5f84516&redirect_uri=http://localhost:4200/login',
    // 'newwindow');

    // this._authService.login().subscribe();
    
  }
}
