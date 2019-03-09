import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

  
  
  @Component({
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
  })
  export class BottomSheetComponent {
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {}

    gaugeType = "arch";
    gaugeValue = 0;
    gaugeLabel = "Risk";
    gaugeAppendText = "--";
    gaugethick = 18;
    gaugeDuration = 40;
    gaugeCap = "round";
    gaugeMax = 100;
    gaugeMin = 0;
  
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }