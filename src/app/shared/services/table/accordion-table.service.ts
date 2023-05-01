import { Injectable } from '@angular/core';
import { TableService } from './table.service';

export class AccordionTableGroup {
  expanded= false;
  level= 0;
  dataTotal?: number;
  constructor(public header:string){

  }
}
@Injectable({
  providedIn: 'root'
})
export class AccordionTableService extends TableService {

  constructor() { super() }
}
/**
 - récupérer la colonne sur laquelle on souhaite grouper
 - lui fournir un niveau n + 1
 - lui attribuer un group parent 
 */