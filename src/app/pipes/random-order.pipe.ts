import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'randomOrder',
    pure: false
})
export class RandomOrderPipe implements PipeTransform {
    transform(items: any[]): any {
        if (!items) {
            return items;
        }
        return items.sort(function() { return  0.5 - Math.random(); });
    }
}
