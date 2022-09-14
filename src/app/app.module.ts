import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SatelliteComponent } from './components/satellite/satellite.component';
import { BasicLineEchartsComponent } from './components/echarts/line/basic-line-echarts/basic-line-echarts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import * as echarts from 'echarts';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';
import { MenuBarComponent } from './components/page-tools/menu-bar/menu-bar.component';
import { EpsComponent } from './pages/eps/eps.component';
import { Ax100Component } from './pages/ax100/ax100.component';
import { EchartService } from './services/echart.service';
import { ClockComponent } from './reloj/clock/clock.component';
import { EPSCurrentGraphComponent } from './epscurrent-graph/epscurrent-graph.component';
import { Maquina2Component } from './pages/maquina2/maquina2.component';
import { Maquina3Component } from './pages/maquina3/maquina3.component';
import { Maquina4Component } from './pages/maquina4/maquina4.component';




@NgModule({
  declarations: [
    AppComponent,
    SatelliteComponent,
    BasicLineEchartsComponent,
    TelemetryComponent,
    MenuBarComponent,
    EpsComponent,
    Ax100Component,
    ClockComponent,
    EPSCurrentGraphComponent,
    Maquina2Component,
    Maquina3Component,
    Maquina4Component,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts}),
    
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [EchartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
