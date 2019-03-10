import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {RisqcService} from './services/risqc.service';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {Subject, Subscription} from 'rxjs';
import {WarningCard} from './models/warning-card.model';
import {RisqData} from './models/risq-data.model';
import {NgProgressComponent} from '@ngx-progressbar/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInputRef: ElementRef;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

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
  mapZoom = 14;
  myPosition: LatLngLiteral = null;
  risqData$: Subject<RisqData> = new Subject<RisqData>();

  searchQuery = '';

  drawerOpened = false;
  drawerMode = 'side';

  // Gauge
  gauge = {
    type: 'arch',
    value: 0,
    label: 'Risque',
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

  cards: WarningCard[] = [];

  subscriptions: Subscription[] = [];

  constructor(private risqcService: RisqcService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.drawerMode = 'over';
        } else {
          this.drawerMode = 'side';
        }
      });

    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(46.701786, -71.448702),
      new google.maps.LatLng(46.960671, -71.152094));

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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
    this.progressBar.start();
    this.risqData$.next(null);
    this.myPosition = position;
    this.mapPosition = position;
    this.mapZoom = 16;
    this.mapRef.setCenter(this.mapPosition);

    this.risqcService.getFloodZones(position).subscribe(risqData => {
      this.risqData$.next(risqData);
      let score = risqData.score * 100;
      score = Math.round(score * 10) / 10;
      this.gauge.value = score;

      this.calculateRisk(risqData);
      this.progressBar.complete();
    });
  }

  calculateRisk(data: RisqData) {
    this.drawerOpened = true;
    // const score = 0;
    // if (zones.length) {
    //   const closestZone = zones[0].distance;
    // }
  }
}
