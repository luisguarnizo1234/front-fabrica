import { Component, OnInit } from '@angular/core';
import { end } from '@popperjs/core'
import { EChartsOption } from 'echarts'
import { forkJoin, map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'


@Component({
  selector: 'app-ax100',
  templateUrl: './ax100.component.html',
  styleUrls: ['./ax100.component.css']
})
export class Ax100Component implements OnInit {

  isRealTime: boolean
  subscription: Subscription
  rxTime = new Date()
  timeUpdate = 120000
  r = 0
  optionComTemp!: EChartsOption
  optionComRx!: EChartsOption
  optionComOther!: EChartsOption
  optionComTx!: EChartsOption
  
  //===================================================
  //FEchas Formato String
  //===================================================
  
  inputComTempStartDate: string
  inputComTempEndDate: string

  inputComRxStartDate: string
  inputComRxEndDate: string

  inputComOtherStartDate: string
  inputComOtherEndDate: string

  inputComTxStartDate: string
  inputComTxEndDate: string
  //===================================================
  //botones g
  //===================================================
  comTempEndDate = new Date()
  comTempStartDate = new Date()

  comRxEndDate = new Date()
  comRxStartDate = new Date()

  comOtherEndDate = new Date()
  comOtherStartDate = new Date()

  comTxEndDate = new Date()
  comTxStartDate = new Date()
  
  //===================================================
  //Fecha en number o mili segundos
  //===================================================
  numComTempStartDate: number
  numComTempEndDate: number

  numComRxStartDate: number
  numComRxEndDate: number

  numComOtherStartDate: number
  numComOtherEndDate: number

  numComTxStartDate: number
  numComTxEndDate: number

  constructor(private echarService: EchartService) {}
  imprimirdate() {
    //console.log(this.inputStarDate);

    //Establecer fecha por defecto como la fecha actual
    this.btnComTemp(4)
    this.btnComRx(4)
    this.btnComOther(4)
    this.btnComTx(4)
   

    
  }
  ngOnInit(): void {
    this.btnComTemp(0)
    this.btnComRx(0)
    this.btnComOther(0)
    this.btnComTx(0)


    this.getData()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  updateInputs() {
    
    this.inputComTempEndDate = this.comTempEndDate.toISOString().slice(0, 16)
    this.inputComTempStartDate = this.comTempStartDate.toISOString().slice(0, 16)

    this.inputComRxEndDate = this.comRxEndDate.toISOString().slice(0, 16)
    this.inputComRxStartDate = this.comRxStartDate.toISOString().slice(0, 16)

    this.inputComOtherEndDate = this.comOtherEndDate.toISOString().slice(0, 16)
    this.inputComOtherStartDate = this.comOtherStartDate.toISOString().slice(0, 16)

    this.inputComTxEndDate = this.comTxEndDate.toISOString().slice(0, 16)
    this.inputComTxStartDate = this.comTxStartDate.toISOString().slice(0, 16)


  }
  //===================================================
  //Metodos para manejar botones 
  //===================================================
  btnComTemp(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.comTempEndDate = new Date()
        this.comTempStartDate = new Date(
          new Date().setDate(this.comTempEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.comTempEndDate = new Date()
        this.comTempStartDate = new Date(
          new Date().setDate(this.comTempEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.comTempStartDate = new Date(this.inputComTempStartDate)
        break
      case 5:
        this.comTempEndDate = new Date(this.inputComTempEndDate)
        break
      default:
        this.comTempEndDate = new Date()
        this.comTempStartDate = new Date(
          new Date().setDate(this.comTempEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numComTempStartDate = this.converterDateToNumber(this.comTempStartDate)
    this.numComTempEndDate = this.converterDateToNumber(this.comTempEndDate)
  }

  btnComRx(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.comRxEndDate = new Date()
        this.comRxStartDate = new Date(
          new Date().setDate(this.comRxEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.comRxEndDate = new Date()
        this.comRxStartDate = new Date(
          new Date().setDate(this.comRxEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.comRxStartDate = new Date(this.inputComRxStartDate)
        break
      case 5:
        this.comRxEndDate = new Date(this.inputComRxEndDate)
        break
      default:
        this.comRxEndDate = new Date()
        this.comRxStartDate = new Date(
          new Date().setDate(this.comRxEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numComRxStartDate = this.converterDateToNumber(this.comRxStartDate)
    this.numComRxEndDate = this.converterDateToNumber(this.comRxEndDate)
  }
  btnComOther(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.comOtherEndDate = new Date()
        this.comOtherStartDate = new Date(
          new Date().setDate(this.comOtherEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.comOtherEndDate = new Date()
        this.comOtherStartDate = new Date(
          new Date().setDate(this.comOtherEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.comOtherStartDate = new Date(this.inputComOtherStartDate)
        break
      case 5:
        this.comOtherEndDate = new Date(this.inputComOtherEndDate)
        break
      default:
        this.comOtherEndDate = new Date()
        this.comOtherStartDate = new Date(
          new Date().setDate(this.comOtherEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numComOtherStartDate = this.converterDateToNumber(this.comOtherStartDate)
    this.numComOtherEndDate = this.converterDateToNumber(this.comOtherEndDate)
  }
  btnComTx(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.comTxEndDate = new Date()
        this.comTxStartDate = new Date(
          new Date().setDate(this.comTxEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.comTxEndDate = new Date()
        this.comTxStartDate = new Date(
          new Date().setDate(this.comTxEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.comTxStartDate = new Date(this.inputComTxStartDate)
        break
      case 5:
        this.comTxEndDate = new Date(this.inputComTxEndDate)
        break
      default:
        this.comTxEndDate = new Date()
        this.comTxStartDate = new Date(
          new Date().setDate(this.comTxEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numComTxStartDate = this.converterDateToNumber(this.comTxStartDate)
    this.numComTxEndDate = this.converterDateToNumber(this.comTxEndDate)
  }
  //===================================================
  //Metodos para calcular fechas
  //===================================================
  converterDateToNumber(fecha: Date): number {
    return Math.round(fecha.getTime() / 1000)
  }
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
          

          this.comTempEndDate = new Date()
          this.numComTempEndDate = this.converterDateToNumber(this.comTempEndDate)

          this.comRxEndDate = new Date()
          this.numComRxEndDate = this.converterDateToNumber(this.comRxEndDate)

          this.comOtherEndDate = new Date()
          this.numComOtherEndDate = this.converterDateToNumber(this.comOtherEndDate)

          this.comTxEndDate = new Date()
          this.numComTxEndDate = this.converterDateToNumber(this.comTxEndDate)

        }

        // FIX ME
        this.r = 1
        this.getDataGraphComTemp()
        this.getDataGraphComRx()
        this.getDataGraphComOther()
        this.getDataGraphComTx()
        
        

      })
  }
  //========================================================================
  //Grafica de COM Temperature
  //========================================================================
  getDataGraphComTemp() {
    // Consumo api backend
    forkJoin({
      reqTemp_pa: this.echarService.getDataSatelliteTimeName(
        5,
        'temp_pa',
        this.numComTempStartDate,
        this.numComTempEndDate,         
      ),
      reqTemp_brd: this.echarService.getDataSatelliteTimeName(
        5,
        'temp_brd',
        this.numComTempStartDate,
        this.numComTempEndDate,         
      ),
      
    }).subscribe(
      ({
        reqTemp_pa,
        reqTemp_brd,
        
      }: any) => {
        this.optionComTemp = {
          title: {
            text: 'COM Temp',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['temp_pa', 'temp_brd'],
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
              data: reqTemp_pa.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 10,
              max: 220,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'temp_pa',
              data: reqTemp_pa.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'temp_brd',
              data: reqTemp_brd.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
          ],
        }
      },
    )
  }
  //========================================================================
  //Grafica de COM Rx
  //========================================================================
  getDataGraphComRx() {
    // Consumo api backend
    forkJoin({
      reqLast_rssi: this.echarService.getDataSatelliteTimeName(
        5,
        'last_rssi',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqBgnd_rssi: this.echarService.getDataSatelliteTimeName(
        5,
        'bgnd_rssi',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqLast_rferr: this.echarService.getDataSatelliteTimeName(
        5,
        'last_rferr',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqRx_count: this.echarService.getDataSatelliteTimeName(
        5,
        'rx_count',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqRx_bytes: this.echarService.getDataSatelliteTimeName(
        5,
        'rx_bytes',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqTot_rx_count: this.echarService.getDataSatelliteTimeName(
        5,
        'tot_rx_count',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqTot_rx_bytes: this.echarService.getDataSatelliteTimeName(
        5,
        'tot_rx_bytes',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      reqLast_contact: this.echarService.getDataSatelliteTimeName(
        5,
        'last_contact',
        this.numComRxStartDate,
        this.numComRxEndDate,         
      ),
      
    }).subscribe(
      ({
        reqLast_rssi,
        reqBgnd_rssi,
        reqLast_rferr,
        reqRx_count,
        reqRx_bytes,
        reqTot_rx_count,
        reqTot_rx_bytes,
        reqLast_contact,

        
      }: any) => {
        this.optionComRx = {
          title: {
            text: 'COM Rx',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['last_rssi', 'bgnd_rssi', 'last_rferr', 'rx_count','rx_bytes','tot_rx_count','tot_rx_bytes','last_contact'],
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
              data: reqLast_rssi.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: -200,
              max: 2000,
              interval: 400,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: '',
              min: 250000000,
              max: 1750000000,
              interval: 100000000,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'last_rssi',
              data: reqLast_rssi.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'bgnd_rssi',
              data: reqBgnd_rssi.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'last_rferr',
              data: reqLast_rferr.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'rx_count',
              yAxisIndex: 1,
              data: reqRx_count.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'rx_bytes',
              yAxisIndex: 1,
              data: reqRx_bytes.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'tot_rx_count',
              yAxisIndex: 1,
              data: reqTot_rx_count.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'tot_rx_bytes',
              yAxisIndex: 1,
              data: reqTot_rx_bytes.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'last_contact',
              yAxisIndex: 1,
              data: reqLast_contact.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },



          ],
        }
      },
    )
  }
  //========================================================================
  //Grafica de COM Other
  //========================================================================
  getDataGraphComOther() {
    // Consumo api backend
    forkJoin({
      reqActive_conf: this.echarService.getDataSatelliteTimeName(
        5,
        'active_conf',
        this.numComOtherStartDate,
        this.numComOtherEndDate,         
      ),
      reqBoot_count: this.echarService.getDataSatelliteTimeName(
        5,
        'boot_count',
        this.numComOtherStartDate,
        this.numComOtherEndDate,         
      ),
      reqBoot_cause: this.echarService.getDataSatelliteTimeName(
        5,
        'boot_cause',
        this.numComOtherStartDate,
        this.numComOtherEndDate,         
      ),
      
    }).subscribe(
      ({
        reqActive_conf,
        reqBoot_count,
        reqBoot_cause,
        
      }: any) => {
        this.optionComOther = {
          title: {
            text: 'COM Other',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['active_conf', 'boot_count', 'boot_cause'],
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
              data: reqActive_conf.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 0,
              max: 200,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'active_conf',
              data: reqActive_conf.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            
            {
              name: 'boot_count',
              data: reqBoot_count.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'boot_cause',
              data: reqBoot_cause.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
          ],
        }
      },
    )
  }
  //========================================================================
  //Grafica de COM Tx
  //========================================================================
  getDataGraphComTx() {
    // Consumo api backend
    forkJoin({
      reqTx_count: this.echarService.getDataSatelliteTimeName(
        5,
        'tx_count',
        this.numComTxStartDate,
        this.numComTxEndDate,         
      ),
      reqTx_bytes: this.echarService.getDataSatelliteTimeName(
        5,
        'tx_bytes',
        this.numComTxStartDate,
        this.numComTxEndDate,         
      ),
      reqTot_tx_count: this.echarService.getDataSatelliteTimeName(
        5,
        'tot_tx_count',
        this.numComTxStartDate,
        this.numComTxEndDate,         
      ),
      reqTot_tx_bytes: this.echarService.getDataSatelliteTimeName(
        5,
        'tot_tx_bytes',
        this.numComTxStartDate,
        this.numComTxEndDate,         
      ),
      reqTx_duty: this.echarService.getDataSatelliteTimeName(
        5,
        'tx_duty',
        this.numComTxStartDate,
        this.numComTxEndDate,         
      ),
      
    }).subscribe(
      ({
        reqTx_count,
        reqTx_bytes,
        reqTot_tx_count,
        reqTot_tx_bytes,
        reqTx_duty,
        
      }: any) => {
        this.optionComTx = {
          title: {
            text: 'COM Tx',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['tx_count', 'tx_bytes', 'tot_tx_count', 'tot_tx_bytes','tx_duty',],
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
              data: reqTx_count.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 0,
              max: 2000,
              interval: 400,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: '',
              min: 2000000,
              max: 4750000000,
              interval: 500000000,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'tx_count',
              yAxisIndex: 1,
              data: reqTx_count.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'tx_bytes',
              yAxisIndex: 1,
              data: reqTx_bytes.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'tot_tx_count',
              yAxisIndex: 1,
              data: reqTot_tx_count.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'tot_tx_bytes',
              yAxisIndex: 1,
              data: reqTot_tx_bytes.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'tx_duty',
              //yAxisIndex: 1,
              data: reqTx_duty.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
          ],
        }
      },
    )
  }
  


 
    
  

}
