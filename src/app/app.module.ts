import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatBottomSheetModule, MatCardModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgxGaugeModule } from 'ngx-gauge';
import { BottomSheetComponent } from './bottomsheet.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxGaugeModule,
    // Google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBn-rCLWCK24YZm3OAxo2AtgULvxy7AeU'
    }),

    // Material
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatBottomSheetModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BottomSheetComponent]
})
export class AppModule { }