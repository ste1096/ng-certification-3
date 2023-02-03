import { Observable } from 'rxjs'

import { Component } from '@angular/core'

import { LocationService } from '../location.service'
import { WeatherService } from '../weather.service'

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent {
  zipcode: string

  constructor(private locationService: LocationService, private weatherService: WeatherService) {}

  addLocation(): Observable<any> {
    return this.weatherService.fetchCondition(this.zipcode)
  }

  onAddedLocation(condition: { zip: string; data: any }) {
    this.zipcode = ''
    this.locationService.addLocation(condition?.zip)
    this.weatherService.addCondition(condition)
  }
}
