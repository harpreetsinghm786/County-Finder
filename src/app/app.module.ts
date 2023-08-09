import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './pages/about/about.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

// material imports
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    NgxMapLibreGLModule,
    AgmCoreModule.forRoot({
      apiKey: 'slCwG0U42ZTgQEryZnzh'
   }),
   HttpClientModule,
   MatProgressSpinnerModule,
   MatChipsModule,
   MatDividerModule,
   FormsModule,
   MatFormFieldModule,
   ReactiveFormsModule,
   MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
