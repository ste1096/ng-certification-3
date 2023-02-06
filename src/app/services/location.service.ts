import { Injectable } from '@angular/core'

import { Location } from '../interfaces/location.interface'

export const LOCATIONS = 'locations'

@Injectable()
export class LocationService {
  locations: Location[] = []

  constructor() {
    const locString = localStorage.getItem(LOCATIONS)
    if (locString) this.locations = JSON.parse(locString)
  }

  addLocation(location: Location): void {
    this.locations.push(location)
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations))
  }

  removeLocation(location: Location): void {
    const index = this.locations.findIndex(
      ({ zipcode, countrycode }) =>
        zipcode === location?.zipcode && countrycode === location?.countrycode
    )
    this.locations.splice(index, 1)
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations))
  }
}
