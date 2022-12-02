# CovidLive documentation 
This is a test project done as per requirements specified in attached pdf file. (KN_programming_test_angular_v1.pdf)

App has cliend_id and client_secret for GitHub Oauth authentication specified in the environment file and is ready for use.
If values expired or to use your own GitHub account, register a new OAuth app at https://github.com/settings/developers  -> Oauth. 
Provide your app URL and redirect URL in the settings (ex. http://localhost:4200 http://localhost:4200/login) and replace cliend_id and client_secret in the environment file with your newly generated cliend_id and client_secret.

To use Oauth Github Login without back-end, enable CORS ignoring extension in your browser and Run `ng serve --configuration production`, or Run `ng serve` and start Back-End proxy by clicking following link:
https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token
Navigate to `http://localhost:4200/` too proceed.
After opening app for the first time you'll be relirected to /login page to authenticate using github account.
after authentication you'll be redirected to the main app where you can select a country and see covid stats.
if you reload your app, your access token will be retreived from session stotage that emulates backend functionality, closing the window will delete the token.
