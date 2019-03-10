import {FireHydrant} from './fire-hydrant.model';
import {FloodZone} from './flood-zone.model';
import {Casern} from './casern.model';

export interface RisqData {
  hydrants: FireHydrant[];
  zones: FloodZone[];
  caserns: Casern[];
  score: number;
}
