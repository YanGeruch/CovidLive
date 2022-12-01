# CovidLive documentation 
This is a test project done as per requirements specified in attached pdf file.

## Development server
 
App has cliend_id and client_secret specified in the environment file for GitHub Oauth authentication and is ready for use.
If values expired or to use your own GitHub account, register a new OAuth app at https://github.com/settings/developers  -> Oauth. 
Provide your app URL and redirect URL in the settings (ex. http://localhost:4200 http://localhost:4200/login) and replace cliend_id and client_secret in the environment file with your newly generated cliend_id and client_secret.


To use Oauth Github Login, enable CORS ignoring extensing in your browser and Run `ng serve --configuration production`, or Run `ng serve` and start Back-End proxy by clicking following link:
https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token
Navigate to `http://localhost:4200/` too proceed.
