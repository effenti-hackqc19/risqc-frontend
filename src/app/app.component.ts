import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {RisqcService} from './services/risqc.service';
import {FloodZone} from './models/flood-zone.model';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {MatBottomSheet} from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('searchInput') searchInputRef: ElementRef;

  mapRef: GoogleMap;
  mapStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];
  mapPosition: LatLngLiteral = {
    lat: 46.816877,
    lng: -71.200460
  };
  mapZoom = 15;
  myPosition: LatLngLiteral = null;
  floodZones: FloodZone[] = [];

  searchQuery = '';

  drawerOpened = false;

  // Gauge
  gauge = {
    type: 'arch',
    value: 80,
    label: 'Risk',
    appendText: '%',
    thick: 18,
    duration: 2000,
    cap: 'round',
    max: 100,
    min: 0,
  };

  thresholdConfig = {
    0: {color: 'green'},
    40: {color: 'orange'},
    75.5: {color: 'red'}
  };

  cards = [
    {icon: 'warning', message: 'teste1'},
    {icon: 'warning', message: 'teste2'},
    {icon: 'error_outline', message: 'teste3'},
    {icon: 'error_outline', message: 'teste4'},
    {icon: 'error_outline', message: 'teste4'},
    {icon: 'error_outline', message: 'teste4'}
  ];

  constructor(private risqcService: RisqcService, private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(45.342521, -73.889893),
      new google.maps.LatLng(47.067651, -70.862224));

    const options = {
      bounds: defaultBounds,
      types: ['address'],
      componentRestrictions: {country: 'ca'}
    };

    const autocomplete = new google.maps.places.Autocomplete(this.searchInputRef.nativeElement, options);
    autocomplete.setFields(['geometry']);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place) {
        const latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        this.setPosition(latLng);
      }
    });
  }

  onDrawerToggle(opened) {
    this.drawerOpened = opened;
  }

  onMyLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.geocodeLatLng(myPosition);
      this.setPosition(myPosition);
    }, (error) => {
      console.log(error);
    });
  }

  onMapReady(map) {
    this.mapRef = map;
  }

  geocodeLatLng(latLng: LatLngLiteral) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({location: latLng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.searchQuery = results[0].formatted_address;
        }
      }
    });
  }

  setPosition(position: LatLngLiteral) {
    this.floodZones = [];
    this.myPosition = position;
    this.mapPosition = position;
    this.mapZoom = 15;
    this.mapRef.setCenter(this.mapPosition);

    this.risqcService.getFloodZones(position).subscribe((zones) => {
      this.floodZones = zones;
    });
  }
}
