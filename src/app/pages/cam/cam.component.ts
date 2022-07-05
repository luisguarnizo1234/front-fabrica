import { Component, OnInit } from '@angular/core';
import { end } from '@popperjs/core'
import { EChartsOption } from 'echarts'
import { forkJoin, map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.css']
})
export class CamComponent implements OnInit {
  isRealTime: boolean
  subscription: Subscription
  rxTime = new Date()
  timeUpdate = 120000
  r = 0
  optionCamImgCount!: EChartsOption
  optionPower!: EChartsOption
  optionTemp!: EChartsOption
  optionOther!: EChartsOption
  //===================================================
  //FEchas Formato String
  //===================================================
  
  inputCamImgCountStartDate: string
  inputCamImgCountEndDate: string

  inputPowerStartDate: string
  inputPowerEndDate: string

  inputTempStartDate: string
  inputTempEndDate: string

  inputOtherStartDate: string
  inputOtherEndDate: string
  //===================================================
  //botones g
  //===================================================
  camImgCountEndDate = new Date()
  camImgCountStartDate = new Date()

  powerEndDate = new Date()
  powerStartDate = new Date()

  tempEndDate = new Date()
  tempStartDate = new Date()

  otherEndDate = new Date()
  otherStartDate = new Date()
  //===================================================
  //Fecha en number o mili segundos
  //===================================================
  numCamImgCountStartDate: number
  numCamImgCountEndDate: number

  numPowerStartDate: number
  numPowerEndDate: number

  numTempStartDate: number
  numTempEndDate: number

  numOtherStartDate: number
  numOtherEndDate: number

  constructor(private echarService: EchartService) { }
  imprimirdate() {
        //Establecer fecha por defecto como la fecha actual
    this.btnCamImgCount(4)
    this.btnPower(4)
    this.btnTemp(4)
    this.btnOther(4)   
  }

  ngOnInit(): void {
    this.btnCamImgCount(0)
    this.btnPower(0)
    this.btnTemp(0)
    this.btnOther(0)

    this.getData()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  updateInputs() {
    
    this.inputCamImgCountEndDate = this.camImgCountEndDate.toISOString().slice(0, 16)
    this.inputCamImgCountStartDate = this.camImgCountStartDate.toISOString().slice(0, 16)

    this.inputPowerEndDate = this.powerEndDate.toISOString().slice(0, 16)
    this.inputPowerStartDate = this.powerStartDate.toISOString().slice(0, 16)

    this.inputTempEndDate = this.tempEndDate.toISOString().slice(0, 16)
    this.inputTempStartDate = this.tempStartDate.toISOString().slice(0, 16)

    this.inputOtherEndDate = this.otherEndDate.toISOString().slice(0, 16)
    this.inputOtherStartDate = this.otherStartDate.toISOString().slice(0, 16)


  }
  //===================================================
  //Metodos para manejar botones 
  //===================================================
  btnCamImgCount(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.camImgCountEndDate = new Date()
        this.camImgCountStartDate = new Date(
          new Date().setDate(this.camImgCountEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.camImgCountEndDate = new Date()
        this.camImgCountStartDate = new Date(
          new Date().setDate(this.camImgCountEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.camImgCountStartDate = new Date(this.inputCamImgCountStartDate)
        break
      case 5:
        this.camImgCountEndDate = new Date(this.inputCamImgCountEndDate)
        break
      default:
        this.camImgCountEndDate = new Date()
        this.camImgCountStartDate = new Date(
          new Date().setDate(this.camImgCountEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numCamImgCountStartDate = this.converterDateToNumber(this.camImgCountStartDate)
    this.numCamImgCountEndDate = this.converterDateToNumber(this.camImgCountEndDate)
  }
  btnPower(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.powerEndDate = new Date()
        this.powerStartDate = new Date(
          new Date().setDate(this.powerEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.powerEndDate = new Date()
        this.powerStartDate = new Date(
          new Date().setDate(this.powerEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.powerStartDate = new Date(this.inputPowerStartDate)
        break
      case 5:
        this.powerEndDate = new Date(this.inputPowerEndDate)
        break
      default:
        this.powerEndDate = new Date()
        this.powerStartDate = new Date(
          new Date().setDate(this.powerEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numPowerStartDate = this.converterDateToNumber(this.powerStartDate)
    this.numPowerEndDate = this.converterDateToNumber(this.powerEndDate)
  }
  btnTemp(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.tempEndDate = new Date()
        this.tempStartDate = new Date(
          new Date().setDate(this.tempEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.tempEndDate = new Date()
        this.tempStartDate = new Date(
          new Date().setDate(this.tempEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.tempStartDate = new Date(this.inputTempStartDate)
        break
      case 5:
        this.tempEndDate = new Date(this.inputTempEndDate)
        break
      default:
        this.tempEndDate = new Date()
        this.tempStartDate = new Date(
          new Date().setDate(this.tempEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numTempStartDate = this.converterDateToNumber(this.tempStartDate)
    this.numTempEndDate = this.converterDateToNumber(this.tempEndDate)
  }
  btnOther(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.otherEndDate = new Date()
        this.otherStartDate = new Date(
          new Date().setDate(this.otherEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.otherEndDate = new Date()
        this.otherStartDate = new Date(
          new Date().setDate(this.otherEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.otherStartDate = new Date(this.inputOtherStartDate)
        break
      case 5:
        this.otherEndDate = new Date(this.inputOtherEndDate)
        break
      default:
        this.otherEndDate = new Date()
        this.otherStartDate = new Date(
          new Date().setDate(this.otherEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numOtherStartDate = this.converterDateToNumber(this.otherStartDate)
    this.numOtherEndDate = this.converterDateToNumber(this.otherEndDate)
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
          

          this.camImgCountEndDate = new Date()
          this.numCamImgCountEndDate = this.converterDateToNumber(this.camImgCountEndDate)

          this.powerEndDate = new Date()
          this.numPowerEndDate = this.converterDateToNumber(this.powerEndDate)

          this.tempEndDate = new Date()
          this.numTempEndDate = this.converterDateToNumber(this.tempEndDate)

          this.otherEndDate = new Date()
          this.numOtherEndDate = this.converterDateToNumber(this.otherEndDate)

          
        }

        // FIX ME
        this.r = 1
        this.getDataGraphCamImgCount()
        this.getDataGraphPower()
        this.getDataGraphTemperature()
        this.getDataGraphOther()

      })
  }
  //========================================================================
  //Grafica de CAM Image Count
  //========================================================================
  getDataGraphCamImgCount() {
    // Consumo api backend
    forkJoin({
      reqImgCount: this.echarService.getDataSatelliteTimeName(
        6,
        'image-count',
        this.numCamImgCountStartDate,
        this.numCamImgCountEndDate,         
      ),
      
      
    }).subscribe(
      ({
        reqImgCount,
        
        
      }: any) => {
        this.optionCamImgCount = {
          title: {
            text: 'CAM Image Count',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['image-count'],
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
              data: reqImgCount.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 1000,
              max: 4000,
              interval: 500,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'image-count',
              data: reqImgCount.data,
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
  //Grafica de CAM Power
  //========================================================================
  getDataGraphPower() {
    // Consumo api backend
    forkJoin({
      reqIcore: this.echarService.getDataSatelliteTimeName(
        6,
        'icore',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),
      reqIddr: this.echarService.getDataSatelliteTimeName(
        6,
        'iddr',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),
      reqIvcc: this.echarService.getDataSatelliteTimeName(
        6,
        'ivcc',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),

      reqVddcore: this.echarService.getDataSatelliteTimeName(
        6,
        'vddcore',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),
      reqVddioddr: this.echarService.getDataSatelliteTimeName(
        6,
        'vddioddr',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),
      reqVcc: this.echarService.getDataSatelliteTimeName(
        6,
        'vcc',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),
      
      
    }).subscribe(
      ({
        reqIcore,
        reqIddr,
        reqIvcc,
        reqVddcore,
        reqVddioddr,
        reqVcc,
        
        
      }: any) => {
        this.optionPower = {
          title: {
            text: 'CAM Power',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['icore', 'iddr','ivcc','vddcore','vddioddr','vcc'],
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
              data: reqIcore.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'mA',
              min: 80,
              max: 160,
              interval: 10,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: 'mV',
              min: 1100,
              max: 3500,
              interval: 500,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'icore',
              data: reqIcore.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
            {
              name: 'iddr',
              data: reqIddr.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
            {
              name: 'ivcc',
              data: reqIvcc.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
            {
              name: 'vddcore',
              yAxisIndex: 1,
              data: reqVddcore.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mV'
                },
              },
            },
            {
              name: 'vddioddr',
              yAxisIndex: 1,
              data: reqVddioddr.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mV'
                },
              },
            },
            {
              name: 'vcc',
              yAxisIndex: 1,
              data: reqVcc.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mV'
                },
              },
            },

          ],
        }
      },
    )
  }
  //========================================================================
  //Grafica de CAM Temperature
  //========================================================================
  getDataGraphTemperature() {
    // Consumo api backend
    forkJoin({
      reqTemp1: this.echarService.getDataSatelliteTimeName(
        6,
        'temp1',
        this.numTempStartDate,
        this.numTempEndDate,         
      ),
      reqTemp2: this.echarService.getDataSatelliteTimeName(
        6,
        'temp2',
        this.numTempStartDate,
        this.numTempEndDate,         
      ),
      
    }).subscribe(
      ({
        reqTemp1,
        reqTemp2,
        
      }: any) => {
        this.optionTemp = {
          title: {
            text: 'CAM Temperature',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['temp1', 'temp2'],
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
              data: reqTemp1.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '°C',
              min: -100,
              max:75,
              interval: 25,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'temp1',
              data: reqTemp1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
            {
              name: 'temp2',
              data: reqTemp2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
          ],
        }
      },
    )
  }
  //========================================================================
  //Grafica de CAM Temperature
  //========================================================================
  getDataGraphOther() {
    // Consumo api backend
    forkJoin({
      reqBootCount: this.echarService.getDataSatelliteTimeName(
        6,
        'boot-count',
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      reqUnixtime: this.echarService.getDataSatelliteTimeName(
        6,
        'unixtime',
        this.numOtherStartDate,
        this.numOtherEndDate,        
      ),
      reqUptime: this.echarService.getDataSatelliteTimeName(
        6,
        'uptime',
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      reqLoads0: this.echarService.getDataSatelliteTime(
        6,
        'loads',
        0,
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      reqLoads1: this.echarService.getDataSatelliteTime(
        6,
        'loads',
        1,
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      reqLoads2: this.echarService.getDataSatelliteTime(
        6,
        'loads',
        2,
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      
      reqFreeram: this.echarService.getDataSatelliteTimeName(
        6,
        'freeram',
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      reqProcs: this.echarService.getDataSatelliteTimeName(
        6,
        'procs',
        this.numOtherStartDate,
        this.numOtherEndDate,         
      ),
      
    }).subscribe(
      ({
        reqBootCount,
        reqUnixtime,
        reqUptime,
        reqLoads0,
        reqLoads1,
        reqLoads2,
        reqFreeram,
        reqProcs,
        
      }: any) => {
        this.optionOther = {
          title: {
            text: 'CAM Other',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['boot-count', 'unixtime','uptime','loads[0]','loads[1]','loads[2]','freeram','procs'],
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
              data: reqBootCount.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 0,
              max: 2000000000000000000 ,
              interval: 250000000000000000,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'boot-count',
              data: reqBootCount.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'unixtime',
              data: reqUnixtime.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'uptime',
              data: reqUptime.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'loads[0]',
              data: reqLoads0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'loads[1]',
              data: reqLoads1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'loads[2]',
              data: reqLoads2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'freeram',
              data: reqFreeram.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'procs',
              data: reqProcs.data,
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
