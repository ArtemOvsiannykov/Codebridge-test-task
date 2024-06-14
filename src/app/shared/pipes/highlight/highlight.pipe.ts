import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search) {
      return text;
    }
    const keywords = search.split(' ').filter((keyword) => keyword);
    if (!keywords.length) {
      return text;
    }
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
}
