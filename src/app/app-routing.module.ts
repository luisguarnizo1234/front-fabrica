import { NgModule } from '@angular/core';
import { BasicLineEchartsComponent } from './components/echarts/line/basic-line-echarts/basic-line-echarts.component';
import { RouterModule, Routes } from '@angular/router';
import { SatelliteComponent } from './components/satellite/satellite.component';
import { EpsComponent } from './pages/eps/eps.component';
import { Ax100Component } from './pages/ax100/ax100.component';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';
import { Maquina2Component } from './pages/maquina2/maquina2.component';
import { Maquina3Component } from './pages/maquina3/maquina3.component';
import { Maquina4Component } from './pages/maquina4/maquina4.component';
import { ReporteComponent } from './pages/reporte/reporte.component';



const routes: Routes = [
  {
    path: 'home',
    component: Ax100Component
  },
  {
    path: 'M1',
    component: Ax100Component
  }, 
  {
    path: 'M2',
    component: Maquina2Component
  },
  {
    path: 'M3',
    component: Maquina3Component
  },
  {
    path: 'M4',
    component: Maquina4Component
  },
  {
    path: 'demo',
    component: BasicLineEchartsComponent
  },
  {
    path: 'reporte',
    component: ReporteComponent
  },
  
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
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
