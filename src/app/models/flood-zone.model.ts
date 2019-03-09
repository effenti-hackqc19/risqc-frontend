import {LatLngLiteral} from '@agm/core';

export interface FloodZone {
  id: number;
  type: string;
  polygon: LatLngLiteral[];
}
