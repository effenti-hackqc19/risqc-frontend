import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSidenavModule,
  MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RisqcService} from './services/risqc.service';
import {FormsModule} from '@angular/forms';
import {NgxGaugeModule} from 'ngx-gauge';
import {NgProgressModule} from '@ngx-progressbar/core';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    NgxGaugeModule,
    NgProgressModule,
    // Google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBn-rCLWCK24YZm3OAxo2AtgULvxy7AeU'
    }),

    // Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  providers: [RisqcService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
