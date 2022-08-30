# CovidLive documentation kinda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
App has cliend_id and client_secret specified in the environment file for GitHub Oauth authentication and is ready for use.
If values expired or to use your own GitHub account, register a new OAuth app at https://github.com/settings/developers  -> Oauth. 
Provide your app URL and redirect URL in the settings (ex. http://localhost:4200 http://localhost:4200/login) and replace cliend_id and client_secret in the environment file with your newly generated cliend_id and client_secret.

Also to avoid CORS issues when running OAuth flow without backend activate Heroku proxy before using the app at https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token
