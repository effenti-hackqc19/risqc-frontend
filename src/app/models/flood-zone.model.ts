import {LatLngLiteral} from '@agm/core';

export interface FloodZone {
  OBJECTID: number;
  TYPE_ZONE: string;
  GEOMETRIE: LatLngLiteral[];
}
