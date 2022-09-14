import { Component, OnInit } from '@angular/core';
import { end } from '@popperjs/core';
import { EChartsOption } from 'echarts';
import { forkJoin, map, share, Subscription, timer } from 'rxjs';
import { EchartService } from 'src/app/services/echart.service';

@Component({
  selector: 'app-maquina4',
  templateUrl: './maquina4.component.html',
  styleUrls: ['./maquina4.component.css']
})
export class Maquina4Component implements OnInit {
  isRealTime: boolean
  subscription: Subscription
  rxTime = new Date()
  timeUpdate = 1200
  r = 0
  optionComTemp!: EChartsOption
  optionS2!: EChartsOption
  optionS3!: EChartsOption
  optionS4!: EChartsOption

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
        1,
        'temperatura',
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
            text: 'Sensor 1',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
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
              magicType: { type: ['bar'] },
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
              min: 0,
              max: 100,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: 100,          
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 1,
            inRange: {
              color: ['#65B581', '#FFCE34', '#FD665F']
            }
          },
          series: [
            {
              name: 'temp_pa',
              data: reqTemp_pa.data,
              type: 'bar',
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
        2,
        'temperatura',
        this.numComRxStartDate,
          this.numComRxEndDate,         
      ),
      
    }).subscribe(
      ({
        reqLast_rssi
        
      }: any) => {
        this.optionS2 = {
          title: {
            text: 'Sensor 2',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
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
              magicType: { type: ['bar'] },
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
              min: 0,
              max: 100,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: 100,          
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 1,
            inRange: {
              color: ['#65B581', '#FFCE34', '#FD665F']
            }
          },
          series: [
            {
              name: 'temp_pa',
              data: reqLast_rssi.data,
              type: 'bar',
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
        3,
        'temperatura',
        this.numComOtherStartDate,
        this.numComOtherEndDate,         
      ),
      
    }).subscribe(
      ({
        reqActive_conf,
        
      }: any) => {
        this.optionS3 = {
          title: {
            text: 'Sensor 3',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
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
              magicType: { type: ['bar'] },
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
              max: 100,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: 100,          
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 1,
            inRange: {
              color: ['#65B581', '#FFCE34', '#FD665F']
            }
          },
          series: [
            {
              name: 'temp_pa',
              data: reqActive_conf.data,
              type: 'bar',
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
        4,
        'temperatura',
        this.numComTxStartDate,
        this.numComTxEndDate,          
      ),
      
    }).subscribe(
      ({
        reqTx_count,
        
      }: any) => {
        this.optionS4 = {
          title: {
            text: 'Sensor 4',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
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
              magicType: { type: ['bar'] },
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
              max: 100,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: 100,          
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 1,
            inRange: {
              color: ['#65B581', '#FFCE34', '#FD665F']
            }
          },
          series: [
            {
              name: 'temp_pa',
              data: reqTx_count.data,
              type: 'bar',
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
