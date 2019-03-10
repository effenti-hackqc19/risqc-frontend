import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LatLngLiteral} from '@agm/core';
import {FloodZone} from '../models/flood-zone.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RisqResponse} from '../models/risq-response.model';
import {RisqData} from '../models/risq-data.model';

@Injectable()
export class RisqcService {

  constructor(private http: HttpClient) {}

  private static extractFloodZones(coords, type, distance) {
    let color: string;
    switch (type) {
      case 'Zone_inondable_a_risque_100ans':
        color = '#445963'; // Grey
        break;
      case 'Zone_inondable_a_risque_20ans':
        color = '#ff5722'; // Orange
        break;
      default:
        color = '#c62828'; // Red
    }
    return {color, type, distance, polygon: coords.map(latLngTuple => {
        return {
          lng: latLngTuple[0],
          lat: latLngTuple[1]
        };
      })};
  }

  getFloodZones(position: LatLngLiteral): Observable<RisqData> {
    const params: HttpParams = (new HttpParams()).set('lat', `${position.lat}`).set('lng', `${position.lng}`);

    return this.http.get<RisqResponse>(environment.apiBaseUrl, {params}).pipe(map(risqResponse => {
      const risqData: RisqData = {
        zones: [],
        hydrants: [],
        score: risqResponse.risk_score
      };


      risqResponse.zones.forEach(zone => {
        const type = zone.geometry.type;
        zone.geometry.coordinates.forEach(wrapper => {
          if (type == 'Polygon') {
            risqData.zones.push(RisqcService.extractFloodZones(wrapper, zone.type, zone.distance));
          } else {
            risqData.zones = risqData.zones.concat(wrapper.map(coord => RisqcService.extractFloodZones(coord, zone.type, zone.distance)));
          }
        });
        return zone;
      });

      risqResponse.borns.forEach(born => {
        const latLngTuple = born.point.coordinates;
        risqData.hydrants.push({
          location: {lng: latLngTuple[0], lat: latLngTuple[1]}
        });
      });
      return risqData;
    }));
  }
}
