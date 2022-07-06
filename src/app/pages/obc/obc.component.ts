import { Component, OnInit } from '@angular/core';
import { end } from '@popperjs/core'
import { EChartsOption } from 'echarts'
import { forkJoin, map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'

@Component({
  selector: 'app-obc',
  templateUrl: './obc.component.html',
  styleUrls: ['./obc.component.css']
})
export class ObcComponent implements OnInit {
  isRealTime: boolean
  subscription: Subscription
  rxTime = new Date()
  timeUpdate = 120000
  r = 0
  
  optionTemp!: EChartsOption
  optionMisce!: EChartsOption
  optionPower!: EChartsOption
  //===================================================
  //FEchas Formato String
  //===================================================
  
  inputTempStartDate: string
  inputTempEndDate: string

  inputMisceStartDate: string
  inputMisceEndDate: string

  inputPowerStartDate: string
  inputPowerEndDate: string
  //===================================================
  //botones g
  //==================================================
  tempEndDate = new Date()
  tempStartDate = new Date()

  misceEndDate = new Date()
  misceStartDate = new Date()

  powerEndDate = new Date()
  powerStartDate = new Date()
  //===================================================
  //Fecha en number o mili segundos
  //===================================================
  numTempStartDate: number
  numTempEndDate: number
  
  numMisceStartDate: number
  numMisceEndDate: number

  numPowerStartDate: number
  numPowerEndDate: number


  constructor(private echarService: EchartService) { }
  //Establecer fecha por defecto como la fecha actual
  imprimirdate() {
    //console.log(this.inputStarDate);

    //Establecer fecha por defecto como la fecha actual
    this.btnTemp(4)
    this.btnMisce(4)
    this.btnPower(4)
   

    
  }

  ngOnInit(): void {
    this.btnTemp(0)
    this.btnMisce(4)
    this.btnPower(0)

    this.getData()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  updateInputs() {
    
    this.inputTempEndDate = this.tempEndDate.toISOString().slice(0, 16)
    this.inputTempStartDate = this.tempStartDate.toISOString().slice(0, 16)

    this.inputMisceEndDate = this.misceEndDate.toISOString().slice(0, 16)
    this.inputMisceStartDate = this.misceStartDate.toISOString().slice(0, 16)

    this.inputPowerEndDate = this.powerEndDate.toISOString().slice(0, 16)
    this.inputPowerStartDate = this.powerStartDate.toISOString().slice(0, 16)


  }
  //===================================================
  //Metodos para manejar botones 
  //===================================================
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
  btnMisce(opcion: number) {
    this.isRealTime = false

    switch (opcion) {
      case 7:
        this.misceEndDate = new Date()
        this.misceStartDate = new Date(
          new Date().setDate(this.misceEndDate.getDate() - 7),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.misceEndDate = new Date()
        this.misceStartDate = new Date(
          new Date().setDate(this.misceEndDate.getDate() - 3),
        )
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.misceStartDate = new Date(this.inputMisceStartDate)
        break
      case 5:
        this.misceEndDate = new Date(this.inputMisceEndDate)
        break
      default:
        this.misceEndDate = new Date()
        this.misceStartDate = new Date(
          new Date().setDate(this.misceEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numMisceStartDate = this.converterDateToNumber(this.misceStartDate)
    this.numMisceEndDate = this.converterDateToNumber(this.misceEndDate)
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
          
          //agregar para cada nueva grafica
          this.tempEndDate = new Date()
          this.numTempEndDate = this.converterDateToNumber(this.tempEndDate)

          this.misceEndDate = new Date()
          this.numMisceEndDate = this.converterDateToNumber(this.misceEndDate)

          this.powerEndDate = new Date()
          this.numPowerEndDate = this.converterDateToNumber(this.powerEndDate)


        }

        // FIX ME
        this.r = 1
        this.getDataGraphTemp()
        this.getDataGraphMisce()
        this.getDataGraphPower()
        

      })
  }
  //========================================================================
  //Grafica de OBC Temperature
  //========================================================================
  getDataGraphTemp() {
    // Consumo api backend
    forkJoin({
      reqTemp_a: this.echarService.getDataSatelliteTimeName(
        1,
        'temp_a',
        this.numTempStartDate,
        this.numTempEndDate,         
      ),
      reqTemp_b: this.echarService.getDataSatelliteTimeName(
        1,
        'temp_b',
        this.numTempStartDate,
        this.numTempEndDate,      
      ),
      
    }).subscribe(
      ({
        reqTemp_a,
        reqTemp_b,
        
      }: any) => {
        this.optionTemp = {
          title: {
            text: 'OBC Temp',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['temp_a', 'temp_b'],
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
              data: reqTemp_a.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '°C',
              min: 0,
              max: 300,
              interval: 30,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'temp_a',
              data: reqTemp_a.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },

            {
              name: 'temp_b',
              data: reqTemp_b.data,
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
  //Grafica de OBC Temperature
  //========================================================================
  getDataGraphMisce() {
    // Consumo api backend
    forkJoin({
      reqBootCount: this.echarService.getDataSatelliteTimeName(
        1,
        'boot_count',
        this.numMisceStartDate,
        this.numMisceEndDate,         
      ),
      reqBootCause: this.echarService.getDataSatelliteTimeName(
        1,
        'boot_cause',
        this.numMisceStartDate,
        this.numMisceEndDate,       
      ),
      
    }).subscribe(
      ({
        reqBootCount,
        reqBootCause,
        
      }: any) => {
        this.optionMisce = {
          title: {
            text: 'OBC Miscellaneus',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['boot_count', 'boot_cause'],
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
              max: 260,
              interval: 50,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: '',
              min: 50,
              max: 70,
              interval: 2.5,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'boot_count',
              data: reqBootCount.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'boot_cause',
              data: reqBootCause.data,
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
  //Grafica de OBC Temperature
  //========================================================================
  getDataGraphPower() {
    // Consumo api backend
    forkJoin({
      reqPwrFlash: this.echarService.getDataSatelliteTimeName(
        1,
        'pwrFlash',
        this.numPowerStartDate,
        this.numPowerEndDate,         
      ),
      reqCurFlash: this.echarService.getDataSatelliteTimeName(
        1,
        'curFlash',
        this.numPowerStartDate,
        this.numPowerEndDate,      
      ),
      
    }).subscribe(
      ({
        reqPwrFlash,
        reqCurFlash,
        
      }: any) => {
        this.optionPower = {
          title: {
            text: 'OBC Power',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['pwrFlash', 'curFlash'],
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
              data: reqPwrFlash.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'mA',
              min: 0,
              max: 60,
              interval: 6,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: '',
              min: 0,
              max: 2,
              interval: 0.09,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'pwrFlash',
              data: reqPwrFlash.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'curFlash',
              data: reqCurFlash.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
          ],
        }
      },
    )
  }


  

}
