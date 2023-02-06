import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

import { Option } from '../../interfaces'

@Component({
  selector: 'app-input-select-search',
  templateUrl: './input-select-search.component.html',
  styleUrls: ['./input-select-search.component.css'],
})
export class InputSelectSearchComponent implements OnChanges {
  @ViewChild('input') inputElement: ElementRef

  @Input() options: Option[]
  @Input() placeholder = ''

  @Output() onChange = new EventEmitter<Option>()

  term = ''
  currentOptions: Option[]
  selectedOption: Option
  dropdownOpen = false

  constructor(private elem: ElementRef) {}

  ngOnChanges(sc: SimpleChanges) {
    if (sc?.options) {
      this.currentOptions = this.options
    }
  }

  get dropdownElement(): Element {
    return this.elem.nativeElement.querySelector('.dropdown-list')
  }

  toggleDropdown() {
    this.dropdownOpen = true
    this.dropdownElement.setAttribute('aria-expanded', 'true')
  }

  closeDropdown() {
    this.dropdownOpen = false
    this.dropdownElement.setAttribute('aria-expanded', 'false')
    this.term = ''
    this.onChangeTerm(this.term)
  }

  select(value: Option) {
    this.selectedOption = value
    this.closeDropdown()
    this.term = ''
    this.onChangeTerm(this.term)
    this.onChange.emit(this.selectedOption)
  }

  onChangeTerm(event: string) {
    this.filterSearch(event)
  }

  clickSelectedOption(event: Event) {
    event?.stopPropagation()
    this.inputElement?.nativeElement?.focus()
    this.toggleDropdown()
  }

  private filterSearch(term = '') {
    this.currentOptions = this.options?.filter((opt) =>
      opt?.name?.toUpperCase()?.includes(term?.toUpperCase())
    )
  }
}
