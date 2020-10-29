import { IPrescriber } from './prescriber.model';

export interface IMedication {
    id: string,
    name: string,
    directionsForUse: string,
    condition: string,
    prescriber: IPrescriber
}