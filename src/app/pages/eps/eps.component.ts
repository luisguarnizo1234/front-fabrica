import { Component, OnInit } from '@angular/core'
import { end } from '@popperjs/core'
import { EChartsOption } from 'echarts'
import { forkJoin, map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: 'app-eps',
  templateUrl: './eps.component.html',
  styleUrls: ['./eps.component.css'],
})
export class EpsComponent implements OnInit {
  options!: EChartsOption
  options2!: EChartsOption
  optionEPSCurIn!: EChartsOption

  optionEPSTemp!: EChartsOption

  options4!: EChartsOption
  options5!: EChartsOption

  options6!: EChartsOption

  options9!: EChartsOption
  options10!: EChartsOption
  data: any

  //===================================================
  //FEchas Formato String
  //===================================================
  
  inputStarDate: string
  inputEndDate: string

  inputOutChannelStartDate: string
  inputOutChannelEndDate: string

  inputCurinStartDate: string
  inputCurinEndDate: string

  inputTempStartDate: string
  inputTempEndDate: string

  isRealTime: boolean

  //miltiples graficas
  //actualizar datos
  subscription: Subscription
  rxTime = new Date()

  //variables botones
  weekMls = 168 * 60 * 60000
  currentTime = new Date() //fecha actual *1000 para hora normal
  //EPSendTime = this.currentTime.getTime();

  //===================================================
  //Fecha en Datew Format
  //===================================================
  
  EPSEndDate = new Date()
  EPSstartDate = new Date()

  EPSOutChannelEndDate = new Date()
  EPSOutChannelStartDate = new Date()
  
  curinEndDate = new Date()
  curinStartDate = new Date()

  TempEndDate = new Date()
  TempStartDate = new Date()

  //===================================================
  //Fecha en number o mili segundos
  //===================================================
  
  startDate: number
  endDate: number

  OutChannelStartDate: number
  OutChannelEndDate: number

  numcurinStartDate: number
  numcurinEndDate: number

  numTempStartDate: number
  numTempEndDate: number

  timeUpdate = 120000
  r = 0

  constructor(private echarService: EchartService) {}

  imprimirdate() {
    //console.log(this.inputStarDate);

    //Establecer fecha por defecto como la fecha actual
    this.btnWeekEPSOutCurrent(4)
    this.btnWeekEPSOutChannel(4)
    this.btnEPSCurin(4)
    this.btnEPSTemp(4)
  }

  ngOnInit(): void {
    this.btnWeekEPSOutCurrent(0)
    //this.btnWeekEPSOutCurrent(0)
    this.btnWeekEPSOutChannel(0)
    this.btnEPSCurin(0)
    this.btnEPSTemp(0)

    this.getData()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  updateInputs() {
    this.inputEndDate = this.EPSEndDate.toISOString().slice(0, 16)
    this.inputStarDate = this.EPSstartDate.toISOString().slice(0, 16)

    this.inputOutChannelEndDate = this.EPSOutChannelEndDate.toISOString().slice(0, 16)
    this.inputOutChannelStartDate = this.EPSOutChannelStartDate.toISOString().slice(0, 16)

    this.inputCurinEndDate = this.curinEndDate.toISOString().slice(0, 16)
    this.inputCurinStartDate = this.curinStartDate.toISOString().slice(0, 16)

    this.inputTempEndDate = this.TempEndDate.toISOString().slice(0, 16)
    this.inputTempStartDate = this.TempStartDate.toISOString().slice(0, 16)
  }

  /**
   * este metodo calcula la fehca de acuerdoa a la opcion
   * @param opcion
   */
  //Control de Calemdario y rangos de fecha para EPS outcurrent
  btnWeekEPSOutCurrent(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
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
          new Date().setDate(this.EPSEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.startDate = this.converterDateToNumber(this.EPSstartDate)
    this.endDate = this.converterDateToNumber(this.EPSEndDate)

    //this.inputEndDate = this.EPSEndDate.toISOString().slice(0, 16);
    //this.inputStarDate = this.EPSstartDate.toISOString().slice(0, 16);

    //console.log('------------------------------------------------')
   // console.log('Fecha Inicio:', this.EPSstartDate)
    //console.log('Fecha Fin:', this.EPSEndDate)
    //console.log('------------------------------------------------')

  }
  //==================================================================
  //Boton EPS outChannel
  //==================================================================
  btnWeekEPSOutChannel(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
    //console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.EPSOutChannelEndDate = new Date()
        this.EPSOutChannelStartDate = new Date(
          new Date().setDate(this.EPSOutChannelEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.EPSOutChannelEndDate = new Date()
        this.EPSOutChannelStartDate = new Date(
          new Date().setDate(this.EPSOutChannelEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.EPSOutChannelStartDate = new Date(this.inputOutChannelStartDate)
        break
      case 5:
        this.EPSOutChannelEndDate = new Date(this.inputOutChannelEndDate)
        break
      default:
        this.EPSOutChannelEndDate = new Date()
        this.EPSOutChannelStartDate = new Date(
          new Date().setDate(this.EPSOutChannelEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.OutChannelStartDate = this.converterDateToNumber(this.EPSOutChannelStartDate)
    this.OutChannelEndDate = this.converterDateToNumber(this.EPSOutChannelEndDate)

    //this.inputEndDate = this.EPSEndDate.toISOString().slice(0, 16);
    //this.inputStarDate = this.EPSstartDate.toISOString().slice(0, 16);

    //console.log('------------------------------------------------')
    //console.log('Fecha Inici)o:', this.EPSstartDate
    //console.log('Fecha Fin:', this.EPSEndDate)
    //console.log('------------------------------------------------')

  }
  //==================================================================
  //Boton EPS Curin
  //==================================================================
  btnEPSCurin(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.curinEndDate = new Date()
        this.curinStartDate = new Date(
          new Date().setDate(this.curinEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.curinEndDate = new Date()
        this.curinStartDate = new Date(
          new Date().setDate(this.curinEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.curinStartDate = new Date(this.inputCurinStartDate)
        break
      case 5:
        this.curinEndDate = new Date(this.inputCurinEndDate)
        break
      default:
        this.curinEndDate = new Date()
        this.curinStartDate = new Date(
          new Date().setDate(this.curinEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numcurinStartDate = this.converterDateToNumber(this.curinStartDate)
    this.numcurinEndDate = this.converterDateToNumber(this.curinEndDate)

    //this.inputEndDate = this.EPSEndDate.toISOString().slice(0, 16);
    //this.inputStarDate = this.EPSstartDate.toISOString().slice(0, 16);

    //console.log('------------------------------------------------')
   // console.log('Fecha Inicio:', this.EPSstartDate)
    //console.log('Fecha Fin:', this.EPSEndDate)
    //console.log('------------------------------------------------')

  }
//==================================================================
  //Boton EPS Temp
  //==================================================================
  btnEPSTemp(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.TempEndDate = new Date()
        this.TempStartDate = new Date(
          new Date().setDate(this.TempEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.TempEndDate = new Date()
        this.TempStartDate = new Date(
          new Date().setDate(this.TempEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.TempStartDate = new Date(this.inputTempStartDate)
        break
      case 5:
        this.TempEndDate = new Date(this.inputTempEndDate)
        break
      default:
        this.TempEndDate = new Date()
        this.TempStartDate = new Date(
          new Date().setDate(this.TempEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numTempStartDate = this.converterDateToNumber(this.TempStartDate)
    this.numTempEndDate = this.converterDateToNumber(this.TempEndDate)
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

          this.EPSOutChannelEndDate = new Date()
          this.OutChannelEndDate = this.converterDateToNumber(this.EPSOutChannelEndDate)
          
          this.curinEndDate = new Date()
          this.numcurinEndDate = this.converterDateToNumber(this.curinEndDate)

          this.TempEndDate = new Date()
          this.numTempEndDate = this.converterDateToNumber(this.TempEndDate)

        }

        // FIX ME
        //this.r = Math.random()
        this.r = 1
        this.getDataGraphOne()
        this.getDataGraphTwo()
        this.getDataGraphEPSCurIn()
        this.getDataGraphEPSTemp()
       //// this.getDataGraphThree()
        //this.getDataGraphFour()
        //this.getDataGraphFive()
      })
  }
  //EPS OUTCURRENT
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
      /* reqCuroutWDE: this.echarService.getDataSatelliteTime(1, 'curout', 0,  1646359200, 1646366400),
      reqCuroutGPS: this.echarService.getDataSatelliteTime(1, 'curout', 1,  1646359200, 1646366400),
      reqCuroutAX100: this.echarService.getDataSatelliteTime(1, 'curout', 2,  1646359200, 1646366400),
      reqCuroutCAM: this.echarService.getDataSatelliteTime(1, 'curout', 3,  1646359200, 1646366400),
      reqCuroutOBC: this.echarService.getDataSatelliteTime(1, 'curout', 4,  1646359200, 1646366400),
      reqCuroutADCS: this.echarService.getDataSatelliteTime(1, 'curout', 5,  1646359200, 1646366400), */
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
              //data: reqCuroutWDE.data.map((x: any) => x * this.r),
              data: reqCuroutWDE.data,
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
  //Grafico EPS Out Channels
  getDataGraphTwo() {
    
    forkJoin({
      reqOutValWDE: this.echarService.getDataSatelliteTime(
        1,
        'out_val',
        0,
        //this.OutChannelStartDate,
        //this.OutChannelEndDate,
        this.OutChannelStartDate,
        this.OutChannelEndDate,
        
      ),
      reqOutValGPS: this.echarService.getDataSatelliteTime(
        1,
        'out_val',
        1,
        this.OutChannelStartDate,
        this.OutChannelEndDate,
      ),
      reqOutValAX100: this.echarService.getDataSatelliteTime(
        1,
        'out_val',
        2,
        this.OutChannelStartDate,
        this.OutChannelEndDate,
      ),
      reqOutValCAM: this.echarService.getDataSatelliteTime(
        1,
        'out_val',
        3,
        this.OutChannelStartDate,
        this.OutChannelEndDate,
      ),
      reqOutValOBC: this.echarService.getDataSatelliteTime(
        1,
        'out_val',
        4,
        this.OutChannelStartDate,
        this.OutChannelEndDate,
      ),
      reqOutValADCS: this.echarService.getDataSatelliteTime(
        1,
        'out_val',
        5,
        this.OutChannelStartDate,
        this.OutChannelEndDate,
      ),
    }).subscribe(
      ({
        reqOutValWDE,
        reqOutValGPS,
        reqOutValAX100,
        reqOutValCAM,
        reqOutValADCS,
        reqOutValOBC,
      }: any) => {
        this.options2 = {
          title: {
            text: 'EPS OutputChannels',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['WDE', 'GPS', 'AX100', 'CAM', 'ADCS', 'OBC '],
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
          xAxis: {
            type: 'category',
            data: reqOutValWDE.dates,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} mA',
            },
          },
          series: [
            {
              name: 'WDE',
              data: reqOutValWDE.data,
              type: 'line',
            },
            {
              name: 'GPS',
              data: reqOutValGPS.data,
              type: 'line',
            },
            {
              name: 'AX100',
              data: reqOutValAX100.data,
              type: 'line',
            },
            {
              name: 'CAM',
              data: reqOutValCAM.data,
              type: 'line',
            },
            {
              name: 'ADCS',
              data: reqOutValADCS.data,
              type: 'line',
            },
            {
              name: 'OBC',
              data: reqOutValOBC.data,
              type: 'line',
            },
          ],
        }
      },
    )
  }
  //========================================================================
  //Grafica de CurIn
  //========================================================================
  //EPS OUTCURRENT
  getDataGraphEPSCurIn() {
    // Consumo api backend
    forkJoin({
      reqCurIn0: this.echarService.getDataSatelliteTime(
        1,
        'curin',
        0,      
        this.numcurinStartDate,
        this.numcurinEndDate,
                
      ),
      reqCurIn1: this.echarService.getDataSatelliteTime(
        1,
        'curin',
        1,
        this.numcurinStartDate,
        this.numcurinEndDate,
      ),
      reqCurIn2: this.echarService.getDataSatelliteTime(
        1,
        'curin',
        2,
        this.numcurinStartDate,
        this.numcurinEndDate,
      ),
      /* reqCuroutWDE: this.echarService.getDataSatelliteTime(1, 'curout', 0,  1646359200, 1646366400),
      reqCuroutGPS: this.echarService.getDataSatelliteTime(1, 'curout', 1,  1646359200, 1646366400),
      reqCuroutAX100: this.echarService.getDataSatelliteTime(1, 'curout', 2,  1646359200, 1646366400),
      reqCuroutCAM: this.echarService.getDataSatelliteTime(1, 'curout', 3,  1646359200, 1646366400),
      reqCuroutOBC: this.echarService.getDataSatelliteTime(1, 'curout', 4,  1646359200, 1646366400),
      reqCuroutADCS: this.echarService.getDataSatelliteTime(1, 'curout', 5,  1646359200, 1646366400), */
    }).subscribe(
      ({
        reqCurIn0,
        reqCurIn1,
        reqCurIn2,
      }: any) => {
        ////console.log(reqCuroutWDE);
        ////console.log(reqCuroutGPS);

        this.optionEPSCurIn = {
          title: {
            text: 'EPS InCurrent',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Curin[0]', 'Curin[1]', 'Curin[2]'],
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
              data: reqCurIn0.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Curin',
              min: 0,
              max: 700,
              interval: 50,
              axisLabel: {
                formatter: '{value} mA',
              },
            },
            {
              type: 'value',
              name: 'GPS',
              min: 0,
              max: 700,
              interval: 50,
              axisLabel: {
                formatter: '{value} mV',
              },
            },
          ],
          series: [
            {
              name: 'Curin[0]',
              //data: reqCuroutWDE.data.map((x: any) => x * this.r),
              data: reqCurIn0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
            {
              name: 'Curin[1]',
              yAxisIndex: 1,
              data: reqCurIn1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' mA'
                },
              },
            },
            {
              name: 'Curin[2]',
              yAxisIndex: 1,
              data: reqCurIn2.data,
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

  //========================================================================
  //Grafica de temp
  //========================================================================
  getDataGraphEPSTemp() {
    // Consumo api backend
    forkJoin({
      reqTemp0: this.echarService.getDataSatelliteTime(
        1,
        'temp',
        0,      
        this.numTempStartDate,
        this.numTempEndDate,
                
      ),
      reqTemp1: this.echarService.getDataSatelliteTime(
        1,
        'temp',
        1,
        this.numTempStartDate,
        this.numTempEndDate,
      ),
      reqTemp2: this.echarService.getDataSatelliteTime(
        1,
        'temp',
        2,
        this.numTempStartDate,
        this.numTempEndDate,
      ),
      reqTemp3: this.echarService.getDataSatelliteTime(
        1,
        'temp',
        3,
        this.numTempStartDate,
        this.numTempEndDate,
      ),
      reqTemp4: this.echarService.getDataSatelliteTime(
        1,
        'temp',
        4,
        this.numTempStartDate,
        this.numTempEndDate,
      ),
      reqTemp5: this.echarService.getDataSatelliteTime(
        1,
        'temp',
        5,
        this.numTempStartDate,
        this.numTempEndDate,
      ),
      
      
      
    }).subscribe(
      ({
        reqTemp0,
        reqTemp1,
        reqTemp2,
        reqTemp3,
        reqTemp4,
        reqTemp5,
      }: any) => {
        ////console.log(reqCuroutWDE);
        ////console.log(reqCuroutGPS);

        this.optionEPSTemp = {
          title: {
            text: 'EPS Temperature',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Temp[0]', 'Temp[1]', 'Temp[2]', 'Temp[3]', 'Temp[4]', 'Temp[5]'],
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
              data: reqTemp0.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Temp',
              min: 0,
              max: 30,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C',
              },
            },
            
            
          ],
          series: [
            {
              name: 'Temp[0]',
              //data: reqCuroutWDE.data.map((x: any) => x * this.r),
              data: reqTemp0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
            {
              name: 'Temp[1]',
              //yAxisIndex: 1,
              data: reqTemp1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
            {
              name: 'Temp[2]',
              //yAxisIndex: 1,
              data: reqTemp2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
            {
              name: 'Temp[3]',
              //yAxisIndex: 1,
              data: reqTemp3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
            {
              name: 'Temp[4]',
              //yAxisIndex: 1,
              data: reqTemp4.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' °C'
                },
              },
            },
            {
              name: 'Temp[5]',
              //yAxisIndex: 1,
              data: reqTemp5.data,
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



  //===========================================================================
  //Cuarto grafico
  getDataGraphFour() {
    //Grafico Output channe
    forkJoin({
      reqCurinWDE: this.echarService.getDataSatelliteTime(
        1,
        'curin',
        0,
        1646407224,
        1646407320,
      ),
      reqCurinGPS: this.echarService.getDataSatelliteTime(
        1,
        'curin',
        1,
        1646407224,
        1646407320,
      ),
      reqCurinAX100: this.echarService.getDataSatelliteTime(
        1,
        'curin',
        2,
        1646407224,
        1646407320,
      ),
      
    }).subscribe(
      ({
        reqCurinWDE,
        reqCurinGPS,
        reqCurinAX100,
      }: any) => {
        this.options4 = {
          title: {
            text: 'EPS curin',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['curin[0]', 'curin[1]', 'curin[2]'],
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
          xAxis: {
            type: 'category',
            data: reqCurinWDE.dates,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} mA',
            },
          },
          series: [
            {
              name: 'curin[0]',
              data: reqCurinWDE.data,
              type: 'line',
            },
            {
              name: 'curin[1]',
              data: reqCurinGPS.data,
              type: 'line',
            },
            {
              name: 'curin[2]',
              data: reqCurinAX100.data,
              type: 'line',
            },
          ],
        }
      },
    )
  }


  /* getDataGraphThree() {
    this.echarService.getDataSatellite(5, 'last_rssi').subscribe((res: any) => {
      var d = new Date(0) // The 0 there is the key, which sets the date to the epoch

      let r = Math.random() * 100
      ////console.log(r)
      d.setUTCSeconds(res.dates[0])
      ////console.log(res.data)
      this.options10 = {
        title: {
          text: 'rssi',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.dates,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: res.data.map((x: any) => x * r),
            type: 'line',
            areaStyle: {},
          },
        ],
      }
    })
  } */

/*   getDataGraphFour() {
    this.echarService.getDataSatellite(5, 'last_rssi').subscribe((res: any) => {
      this.options4 = {
        title: {
          text: 'RSSI',
        },
        //tooltip genera un cursos encima de la grafica
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          },
        },
        legend: {
          data: ['RSSI'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
        xAxis: {
          type: 'category',
          data: res.dates,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} dBm',
          },
          boundaryGap: [0, '100%'],
        },
        //habilita barra de selección de rango
        /* dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ], 
        
        series: [
          {
            name: 'RSSI',
            data: res.data,
            type: 'line',
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
            },
            /* markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            }, 
          },
        ],
      }
    })
  } */

/*   getDataGraphFive() {
    forkJoin({
      reqCuroutWDE: this.echarService.getDataSatelliteIndex(1, 'curout', 0),
      reqCuroutGPS: this.echarService.getDataSatelliteIndex(1, 'curout', 1),
      reqCuroutAX100: this.echarService.getDataSatelliteIndex(1, 'curout', 2),
      reqCuroutCAM: this.echarService.getDataSatelliteIndex(1, 'curout', 3),
      reqCuroutOBC: this.echarService.getDataSatelliteIndex(1, 'curout', 4),
      reqCuroutADCS: this.echarService.getDataSatelliteIndex(1, 'curout', 5),
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

        this.options5 = {
          title: {
            text: 'Stacked Line',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['WDE', 'GPS', 'AX100', 'CAM', 'ADCS', 'OBC '],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            data: reqCuroutWDE.dates,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'WDE',
              data: reqCuroutWDE.data,
              type: 'line',
            },
            {
              name: 'GPS',
              data: reqCuroutGPS.data,
              type: 'line',
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
  } */



}
