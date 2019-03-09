import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {RisqcService} from './services/risqc.service';
import {FloodZone} from './models/flood-zone.model';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {BottomSheetComponent} from './bottomsheet.component';
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
  floodZones: FloodZone[] = null;

  searchQuery = '';

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

  onMapReady(map) {
    this.mapRef = map;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }

  setPosition(position: LatLngLiteral) {
    this.myPosition = position;
    this.mapPosition = position;
    this.mapZoom = 15;
    this.mapRef.setCenter(this.mapPosition);

    this.risqcService.getFloodZones(position).subscribe((zones) => {
      this.floodZones = zones;
    });
  }
}
