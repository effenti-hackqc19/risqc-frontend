import {Component, OnInit} from '@angular/core';
import {LatLng, LatLngLiteral} from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Map coordinated
  lat = 46.816877;
  lng = -71.200460;

  gaugeType = "arch";
  gaugeValue = 0;
  gaugeLabel = "Risk";
  gaugeAppendText = "%";
  gaugethick = 18;
  gaugeDuration = 40;
  gaugeCap = "round";
  gaugeMax = 100;
  gaugeMin = 0;

  thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };

  mapStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  myPosition: LatLngLiteral = null;

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(this.myPosition);
    }, (error) => {
      console.log(error);
    });

    let teste = setInterval(() => {
      if(this.gaugeValue < 80)
        this.gaugeValue +=2;
      else
        clearInterval(teste);

    },50);

  }
}
