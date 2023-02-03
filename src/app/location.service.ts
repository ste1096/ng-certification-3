import { Injectable } from '@angular/core'

export const LOCATIONS = 'locations'

@Injectable()
export class LocationService {
  locations: string[] = []

  constructor() {
    const locString = localStorage.getItem(LOCATIONS)
    if (locString) this.locations = JSON.parse(locString)
  }

  addLocation(zipcode: string): void {
    this.locations.push(zipcode)
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations))
  }

  removeLocation(zipcode: string): void {
    const index = this.locations.indexOf(zipcode)
    this.locations.splice(index, 1)
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations))
  }
}
