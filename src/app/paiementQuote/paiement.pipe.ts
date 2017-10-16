import { Pipe } from '@angular/core';

@Pipe({name: 'timestampToDate'})
export class PaiementPipe {
  transform (input:number) {

    return new Date(input*1000);
  }
}
