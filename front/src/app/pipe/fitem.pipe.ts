import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'fitem'
})
export class FitemPipe implements PipeTransform {

  transform(value: any[], args?: string): any {
    
     if (args==null) return value;
    return value.filter(item=>item.category==args)
  }

}
