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
  }
}
