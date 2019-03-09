import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {MatBottomSheetModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RisqcService} from './services/risqc.service';
import {FormsModule} from '@angular/forms';
import {BottomSheetComponent} from './bottomsheet.component';
import {NgxGaugeModule} from 'ngx-gauge';

@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxGaugeModule,
    // Google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBn-rCLWCK24YZm3OAxo2AtgULvxy7AeU'
    }),

    // Material
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [RisqcService],
  bootstrap: [AppComponent],
  entryComponents: [BottomSheetComponent]
})
export class AppModule { }
