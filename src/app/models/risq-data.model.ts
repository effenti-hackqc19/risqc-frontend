import {FireHydrant} from './fire-hydrant.model';
import {FloodZone} from './flood-zone.model';

export interface RisqData {
  hydrants: FireHydrant[];
  zones: FloodZone[];
}
