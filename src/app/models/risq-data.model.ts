import {FireHydrant} from './fire-hydrant.model';
import {FloodZone} from './flood-zone.model';
import {Casern} from './casern.model';
import {Message} from './message.model';

export interface RisqData {
  messages: Message[];
  hydrants: FireHydrant[];
  zones: FloodZone[];
  caserns: Casern[];
  score: number;
}
