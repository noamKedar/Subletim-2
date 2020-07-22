import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customPipe'})
export class customPipe implements PipeTransform {
  transform(stat: any):string {
    console.log(stat)
    if(parseInt(stat)==0)
      return('No Statistics - '+ stat.toString() + ' apartments created')
    return ('Number of created apartments from app startup: ' + stat.toString());
  }
}

