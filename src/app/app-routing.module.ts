import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidStatsComponent } from './covid-stats/covid-stats.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/stats', pathMatch: 'full' },
  { path: 'stats', component: CovidStatsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
