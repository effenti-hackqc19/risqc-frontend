import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

  
  
  @Component({
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
  })
  export class BottomSheetComponent implements AfterViewInit{

    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>){}

    gaugeType = "arch";
    gaugeValue = 80;
    gaugeLabel = "Risk";
    gaugeAppendText = "%";
    gaugethick = 18;
    gaugeDuration = 2000;
    gaugeCap = "round";
    gaugeMax = 100;
    gaugeMin = 0;

    thresholdConfig = {
        '0': {color: 'green'},
        '40': {color: 'orange'},
        '75.5': {color: 'red'}
    };

    cards = [
            {icon:"warning",message:"teste1"},
            {icon:"warning",message:"teste2"},
            {icon:"error_outline",message:"teste3"},
            {icon:"error_outline",message:"teste4"},
            {icon:"error_outline",message:"teste4"},
            {icon:"error_outline",message:"teste4"}
        ];

    ngAfterViewInit(): void {



    }
  
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }

  }