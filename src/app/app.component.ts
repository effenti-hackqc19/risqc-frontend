import {Component, OnInit} from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {RisqcService} from './services/risqc.service';
import {FloodZone} from './models/flood-zone.model';

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
  floodZones: FloodZone[] = null;

  searchQuery = '';

  constructor(private risqcService: RisqcService) {}

  ngOnInit(): void {
  }

  onMyLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, (error) => {
      console.log(error);
    });
  }

  onLocationSearch() {

  }

  setPosition(position: LatLngLiteral) {
    this.myPosition = position;
    this.lat = position.lat;
    this.lng = position.lng;

    this.risqcService.getFloodZones(position).subscribe((zones) => {
      this.floodZones = zones;
    });
  }
}
