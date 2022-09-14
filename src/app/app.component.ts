import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { forkJoin } from 'rxjs';
import { EchartService } from './services/echart.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
//
export class AppComponent implements OnInit {
  //title = 'frontend';
  satelliteParent = 'frontend';
  options!: EChartsOption;
  //variables COM STATUS
  tot_rx_count = 0;
  
  currentTime = new Date() //fecha actual *1000 para hora normal
  
  startTime = new Date()
  endTime =  new Date()

  numStartTime: number
  numEndTime: number

  //
  varMessage = '';
  node: Telemetry[] = [];
  constructor(
    private echarService: EchartService,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    //obtener datos del COM AX100
    //===============================================================
    
    this.startTime = new Date(
      new Date().setDate(this.endTime.getDate() - 0.1),
    )
    //convertir fechas a segundos
    this.numStartTime = this.converterDateToNumber(this.startTime)
    this.numEndTime = this.converterDateToNumber(this.endTime)
    

    forkJoin({      
      reqTot_rx_count: this.echarService.getDataSatelliteFirstDataName(5, 'tot_rx_count'),
    
    }).subscribe(
      ({
        reqTot_rx_count,
        
      }: any) => {
    
        var tot_rx_count = reqTot_rx_count.val;

        this.tot_rx_count = tot_rx_count;

      },
    );  
  }

  //metodos para calcular fechas
  converterDateToNumber(fecha: Date): number {
    return Math.round(fecha.getTime() / 1000)
  }
}
export interface Data {
  message: string;
}
export interface Telemetry {
  id: string;
  node: string;
}
