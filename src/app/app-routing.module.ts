import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:"about",component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
