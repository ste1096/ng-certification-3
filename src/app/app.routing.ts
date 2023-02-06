import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainPageComponent } from './components'
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component'

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'forecast/:zipcode/:countrycode',
    component: ForecastsListComponent,
  },
]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {
  relativeLinkResolution: 'legacy',
})
