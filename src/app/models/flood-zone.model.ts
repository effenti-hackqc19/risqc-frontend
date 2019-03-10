import {LatLngLiteral} from '@agm/core';

export interface FloodZone {
  type: string;
  polygon: LatLngLiteral[];
  distance: number;
  color: string;
}
