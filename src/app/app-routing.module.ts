import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './core/app-routes';
import { CovidStatsComponent } from './covid-stats/covid-stats.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.statistics, pathMatch: 'full' },
  { path: APP_ROUTES.statistics, component: CovidStatsComponent },
  { path: APP_ROUTES.login, component: LoginComponent },
  { path: '**', redirectTo: APP_ROUTES.statistics, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
