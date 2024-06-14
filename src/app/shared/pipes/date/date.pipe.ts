import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
})
export class DatePipe implements PipeTransform {
  transform(value: string | null): string {
    if (value === null) {
      return '';
    }

    const day = parseInt(value, 10);

    if (isNaN(day)) {
      return value;
    }

    if (day > 3 && day < 21) {
      return day + 'th';
    }

    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  }
}
