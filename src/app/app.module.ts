import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {MatBottomSheetModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RisqcService} from './services/risqc.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // Google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBn-rCLWCK24YZm3OAxo2AtgULvxy7AeU'
    }),

    // Material
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [RisqcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
