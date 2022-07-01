import { NgModule } from '@angular/core';
import { BasicLineEchartsComponent } from './components/echarts/line/basic-line-echarts/basic-line-echarts.component';
import { RouterModule, Routes } from '@angular/router';
import { SatelliteComponent } from './components/satellite/satellite.component';
import { EpsComponent } from './pages/eps/eps.component';
import { CamComponent } from './pages/cam/cam.component';
import { ObcComponent } from './pages/obc/obc.component';
import { Ax100Component } from './pages/ax100/ax100.component';
import { AdcsComponent } from './pages/adcs/adcs.component';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';
import { ADCSSensorComponent } from './pages/adcs-sensor/adcs-sensor.component';


const routes: Routes = [
  {
    path: 'eps',
    component: EpsComponent
  },
  {
    path: 'obc',
    component: ObcComponent
  },
  {
    path: 'cam',
    component: CamComponent
  },
  {
    path: 'ax100',
    component: Ax100Component
  }, 
  {
    path: 'adcs',
    component: AdcsComponent
  },
  {
    path: 'adcs-sensors',
    component: ADCSSensorComponent
  },
/*   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: EpsComponent
  }
 */
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
