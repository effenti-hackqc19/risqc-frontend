import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LatLngLiteral} from '@agm/core';
import {FloodZone} from '../models/flood-zone.model';
import {map} from 'rxjs/operators';

@Injectable()
export class RisqcService {
  private apiBaseUrl = 'http://localhost:4004/risqs';

  constructor(private http: HttpClient) {}

  getFloodZones(position: LatLngLiteral) {
    const params: HttpParams = (new HttpParams()).set('lat', `${position.lat}`).set('long', `${position.lng}`);

    return this.http.get<FloodZone[]>(this.apiBaseUrl, {params}).pipe(map(zones => {
      return zones.map((zone) => {
        zone.GEOMETRIE = zone.GEOMETRIE.map((geo) => {
          return  {
            lat: parseFloat(`${geo.lat}`),
            lng: parseFloat(`${geo.lng}`)
          };
        });
        return zone;
      });
    }));
  }
}
