import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdata'
})
export class FormatdataPipe implements PipeTransform {

  transform(value: any, search:any): any {
    if(!search){
      return value;
    }else{
        if(search){
          value=value.filter(x=>{
             return x.topicName.toString().indexOf(search)!=-1;
          });
        }
    }

    return value;
  }

}
