import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LatLngLiteral} from '@agm/core';
import {FloodZone} from '../models/flood-zone.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class RisqcService {

  constructor(private http: HttpClient) {}

  private static extractFloodZones(coords, type, distance) {
    let color: string;
    switch (type) {
      case 'Zone_inondable_a_risque_100ans':
        color = 'black';
        break;
      case 'Zone_inondable_a_risque_20ans':
        color = 'orange';
        break;
      default:
        color = 'red';
    }
    return {color, type, distance, polygon: coords.map(latLngTuple => {
      return {
        lng: latLngTuple[0],
        lat: latLngTuple[1]
      };
    })};
  }

  getFloodZones(position: LatLngLiteral): Observable<FloodZone[]> {
    const params: HttpParams = (new HttpParams()).set('lat', `${position.lat}`).set('lng', `${position.lng}`);

    return this.http.get<any[]>(environment.apiBaseUrl, {params}).pipe(map(zones => {
      let allZones: FloodZone[] = [];
      zones.forEach((zone) => {
        const type = zone.geometry.type;
        zone.geometry.coordinates.forEach(wrapper => {
          if (type == 'Polygon') {
            allZones.push(RisqcService.extractFloodZones(wrapper, zone.type, zone.distance));
          } else {
            allZones = allZones.concat(wrapper.map(coord => RisqcService.extractFloodZones(coord, zone.type, zone.distance)));
          }
        });
        return zone;
      });
      return allZones;
    }));
  }
}
