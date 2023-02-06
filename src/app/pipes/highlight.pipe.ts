import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'highlight' })
export class HighligthPipe implements PipeTransform {
  transform(value: string, text = ''): string {
    if (!text) return value
    const regEx = new RegExp(`(${text})`, 'gi')
    return value.replace(regEx, '<strong>$1</strong>')
  }
}
