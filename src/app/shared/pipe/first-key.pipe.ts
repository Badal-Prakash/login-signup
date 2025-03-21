import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKey',
  standalone: true,
})
export class FirstKeyPipe implements PipeTransform {
  transform(value: any): string | null {
    if (value && typeof value === 'object') {
      const keys = Object.keys(value);
      return keys.length > 0 ? keys[0] : null;
    }
    return null;
  }
}
