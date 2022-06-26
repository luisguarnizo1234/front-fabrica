import { Component, OnInit } from '@angular/core';
import { end } from '@popperjs/core'
import { EChartsOption } from 'echarts'
import { forkJoin, map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: 'app-epscurrent-graph',
  templateUrl: './epscurrent-graph.component.html',
  styleUrls: ['./epscurrent-graph.component.css']
})
export class EPSCurrentGraphComponent implements OnInit {
  options!: EChartsOption
  data: any

  inputStarDate: string
  inputEndDate: string

  isRealTime: boolean

  //miltiples graficas
  //actualizar datos
  subscription: Subscription
  rxTime = new Date()

  //variables botones
  weekMls = 168 * 60 * 60000
  currentTime = new Date() //fecha actual *1000 para hora normal
  //EPSendTime = this.currentTime.getTime();
  EPSEndDate = new Date()
  EPSstartDate = new Date()

  startDate: number
  endDate: number

  timeUpdate = 6000
  r = 0


  constructor(private echarService: EchartService) {}

  imprimirdate() {
    //console.log(this.inputStarDate);
    this.btnWeekEPSOutCurrent(4)
  }

  ngOnInit(): void {
    this.btnWeekEPSOutCurrent(0)
    this.getData()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  //
  updateInputs() {
    this.inputEndDate = this.EPSEndDate.toISOString().slice(0, 16)
    this.inputStarDate = this.EPSstartDate.toISOString().slice(0, 16)
  }

  /**
   * este metodo calcula la fehca de acuerdoa a la opcion
   * @param opcion
   */

  btnWeekEPSOutCurrent(opcion: number) {
    this.isRealTime = false
    console.log('------------------------------------------------')
    console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.EPSEndDate = new Date()
        this.EPSstartDate = new Date(
          new Date().setDate(this.EPSEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.EPSEndDate = new Date()
        this.EPSstartDate = new Date(
          new Date().setDate(this.EPSEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.EPSstartDate = new Date(this.inputStarDate)
        break
      case 5:
        this.EPSEndDate = new Date(this.inputEndDate)
        break
      default:
        this.EPSEndDate = new Date()
        this.EPSstartDate = new Date(
          new Date().setDate(this.EPSEndDate.getDate() - 1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.startDate = this.converterDateToNumber(this.EPSstartDate)
    this.endDate = this.converterDateToNumber(this.EPSEndDate)

    //this.inputEndDate = this.EPSEndDate.toISOString().slice(0, 16);
    //this.inputStarDate = this.EPSstartDate.toISOString().slice(0, 16);

    console.log('------------------------------------------------')
    console.log('Fecha Inicio:', this.EPSstartDate)
    console.log('Fecha Fin:', this.EPSEndDate)
    console.log('------------------------------------------------')

  }
  //metodos para calcular fechas
  converterDateToNumber(fecha: Date): number {
    return Math.round(fecha.getTime() / 1000)
  }

  //
  getData() {
    //===============================================================
    //Grafico Output current
    this.subscription = timer(0, this.timeUpdate)
      .pipe(
        map(() => new Date()),
        share(),
      )
      .subscribe((time) => {
        // Activar tiempo real
        if (this.isRealTime) {
          this.EPSEndDate = new Date()
          this.endDate = this.converterDateToNumber(this.EPSEndDate)
        }

        // FIX ME
        this.r = Math.random() * 2
        this.getDataGraphOne()
      })
  }

  //==========================================================
  getDataGraphOne() {
    // Consumo api backend
    forkJoin({
      reqCuroutWDE: this.echarService.getDataSatelliteTime(
        1,
        'curout',
        0,
        this.startDate,
        this.endDate,
      ),
      reqCuroutGPS: this.echarService.getDataSatelliteTime(
        1,
        'curout',
        1,
        this.startDate,
        this.endDate,
      ),
      reqCuroutAX100: this.echarService.getDataSatelliteTime(
        1,
        'curout',
        2,
        this.startDate,
        this.endDate,
      ),
      reqCuroutCAM: this.echarService.getDataSatelliteTime(
        1,
        'curout',
        3,
        this.startDate,
        this.endDate,
      ),
      reqCuroutOBC: this.echarService.getDataSatelliteTime(
        1,
        'curout',
        4,
        this.startDate,
        this.endDate,
      ),
      reqCuroutADCS: this.echarService.getDataSatelliteTime(
        1,
        'curout',
        5,
        this.startDate,
        this.endDate,
      ),
      
    }).subscribe(
      ({
        reqCuroutWDE,
        reqCuroutGPS,
        reqCuroutAX100,
        reqCuroutCAM,
        reqCuroutADCS,
        reqCuroutOBC,
      }: any) => {
        ////console.log(reqCuroutWDE);
        ////console.log(reqCuroutGPS);

        this.options = {
          title: {
            text: 'EPS OutputCurrent',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['WDE', 'GPS', 'AX100', 'CAM', 'ADCS', 'OBC'],
            top: '10%',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '20%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {
                type: 'png',
                title: 'Save img',
              },
            },
          },
          xAxis: [
            {
              type: 'category',
              data: reqCuroutWDE.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'WDE',
              min: 0,
              max: 400,
              interval: 50,
              axisLabel: {
                formatter: '{value} mA',
              },
            },
            {
              type: 'value',
              name: 'GPS',
              min: 0,
              max: 400,
              interval: 50,
              axisLabel: {
                formatter: '{value} mV',
              },
            },
          ],
          series: [
            {
              name: 'WDE',
              data: reqCuroutWDE.data.map((x: any) => x * this.r),
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
            {
              name: 'GPS',
              yAxisIndex: 1,
              data: reqCuroutGPS.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mV'
                },
              },
            },
            {
              name: 'AX100',
              data: reqCuroutAX100.data,
              type: 'line',
            },
            {
              name: 'CAM',
              data: reqCuroutCAM.data,
              type: 'line',
            },
            {
              name: 'ADCS',
              data: reqCuroutADCS.data,
              type: 'line',
            },
            {
              name: 'OBC',
              data: reqCuroutOBC.data,
              type: 'line',
            },
          ],
        }
      },
    )
  }

}
