import { Component, OnInit } from '@angular/core'
import { end } from '@popperjs/core'
import { EChartsOption } from 'echarts'
import { forkJoin, map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'
import { ProductsService } from 'src/app/services/products.service'


@Component({
  selector: 'app-adcs',
  templateUrl: './adcs.component.html',
  styleUrls: ['./adcs.component.css']
})
export class AdcsComponent implements OnInit {
  

  isRealTime: boolean
  subscription: Subscription
  rxTime = new Date()
  timeUpdate = 120000
  r = 0
  optionModeStatus!: EChartsOption
  optionWheels!: EChartsOption
  optionControl!: EChartsOption
  optionTorquer!: EChartsOption
  optionBdot!: EChartsOption
  optionPower!: EChartsOption

  //===================================================
  //FEchas Formato String
  //===================================================
  
  inputStatusStartDate: string
  inputStatusEndDate: string

  inputWheelsStartDate: string
  inputWheelsEndDate: string

  inputControlStartDate: string
  inputControlEndDate: string

  inputTorquerStartDate: string
  inputTorquerEndDate: string

  inputBdotStartDate: string
  inputBdotEndDate: string

  inputPowerStartDate: string
  inputPowerEndDate: string

  
  //===================================================
  //botones g
  //===================================================
  statusEndDate = new Date()
  statusStartDate = new Date()

  wheelsEndDate = new Date()
  wheelsStartDate = new Date()

  controlEndDate = new Date()
  controlStartDate = new Date()

  torquerEndDate = new Date()
  torquerStartDate = new Date()

  bdotEndDate = new Date()
  bdotStartDate = new Date()

  powerEndDate = new Date()
  powerStartDate = new Date()

  //===================================================
  //Fecha en number o mili segundos
  //===================================================
  numStatusStartDate: number
  numStatusEndDate: number

  numWheelsStartDate: number
  numWheelsEndDate: number

  numControlStartDate: number
  numControlEndDate: number

  numTorquerStartDate: number
  numTorquerEndDate: number

  numBdotStartDate: number
  numBdotEndDate: number

  numPowerStartDate: number
  numPowerEndDate: number

  constructor(private echarService: EchartService) {}

  imprimirdate() {
    //console.log(this.inputStarDate);

    //Establecer fecha por defecto como la fecha actual
    this.btnStatus(4)
    this.btnWheels(4)
    this.btnControl(4)
    this.btnTorquer(4)
    this.btnBdot(4)
    this.btnPower(4)

    
  }

  ngOnInit(): void {
    this.btnStatus(0)
    this.btnWheels(0)
    this.btnControl(0)
    this.btnTorquer(0)
    this.btnBdot(0)
    this.btnPower(0)

    this.getData()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  updateInputs() {
    
    this.inputStatusEndDate = this.statusEndDate.toISOString().slice(0, 16)
    this.inputStatusStartDate = this.statusStartDate.toISOString().slice(0, 16)

    this.inputWheelsEndDate = this.wheelsEndDate.toISOString().slice(0, 16)
    this.inputWheelsStartDate = this.wheelsStartDate.toISOString().slice(0, 16)

    this.inputControlEndDate = this.controlEndDate.toISOString().slice(0, 16)
    this.inputControlStartDate = this.controlStartDate.toISOString().slice(0, 16)

    this.inputTorquerEndDate = this.torquerEndDate.toISOString().slice(0, 16)
    this.inputTorquerStartDate = this.torquerStartDate.toISOString().slice(0, 16)

    this.inputBdotEndDate = this.bdotEndDate.toISOString().slice(0, 16)
    this.inputBdotStartDate = this.bdotStartDate.toISOString().slice(0, 16)

    this.inputPowerEndDate = this.powerEndDate.toISOString().slice(0, 16)
    this.inputPowerStartDate = this.powerStartDate.toISOString().slice(0, 16)

  }

  btnStatus(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.statusEndDate = new Date()
        this.statusStartDate = new Date(
          new Date().setDate(this.statusEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.statusEndDate = new Date()
        this.statusStartDate = new Date(
          new Date().setDate(this.statusEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.statusStartDate = new Date(this.inputStatusStartDate)
        break
      case 5:
        this.statusEndDate = new Date(this.inputStatusEndDate)
        break
      default:
        this.statusEndDate = new Date()
        this.statusStartDate = new Date(
          new Date().setDate(this.statusEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numStatusStartDate = this.converterDateToNumber(this.statusStartDate)
    this.numStatusEndDate = this.converterDateToNumber(this.statusEndDate)
  }

  btnWheels(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.wheelsEndDate = new Date()
        this.wheelsStartDate = new Date(
          new Date().setDate(this.wheelsEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.wheelsEndDate = new Date()
        this.wheelsStartDate = new Date(
          new Date().setDate(this.wheelsEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.wheelsStartDate = new Date(this.inputWheelsStartDate)
        break
      case 5:
        this.wheelsEndDate = new Date(this.inputWheelsEndDate)
        break
      default:
        this.wheelsEndDate = new Date()
        this.wheelsStartDate = new Date(
          new Date().setDate(this.wheelsEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numWheelsStartDate = this.converterDateToNumber(this.wheelsStartDate)
    this.numWheelsEndDate = this.converterDateToNumber(this.wheelsEndDate)
  }
  btnControl(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.controlEndDate = new Date()
        this.controlStartDate = new Date(
          new Date().setDate(this.controlEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.controlEndDate = new Date()
        this.controlStartDate = new Date(
          new Date().setDate(this.controlEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.controlStartDate = new Date(this.inputControlStartDate)
        break
      case 5:
        this.controlEndDate = new Date(this.inputControlEndDate)
        break
      default:
        this.controlEndDate = new Date()
        this.controlStartDate = new Date(
          new Date().setDate(this.controlEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numControlStartDate = this.converterDateToNumber(this.controlStartDate)
    this.numControlEndDate = this.converterDateToNumber(this.controlEndDate)
  }

  btnTorquer(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.torquerEndDate = new Date()
        this.torquerStartDate = new Date(
          new Date().setDate(this.torquerEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.torquerEndDate = new Date()
        this.torquerStartDate = new Date(
          new Date().setDate(this.torquerEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.torquerStartDate = new Date(this.inputTorquerStartDate)
        break
      case 5:
        this.torquerEndDate = new Date(this.inputTorquerEndDate)
        break
      default:
        this.torquerEndDate = new Date()
        this.torquerStartDate = new Date(
          new Date().setDate(this.torquerEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numTorquerStartDate = this.converterDateToNumber(this.torquerStartDate)
    this.numTorquerEndDate = this.converterDateToNumber(this.torquerEndDate)
  }
  btnBdot(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.bdotEndDate = new Date()
        this.bdotStartDate = new Date(
          new Date().setDate(this.bdotEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.bdotEndDate = new Date()
        this.bdotStartDate = new Date(
          new Date().setDate(this.bdotEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
        this.isRealTime = true
        this.updateInputs()
        break
      case 4:
        this.bdotStartDate = new Date(this.inputBdotStartDate)
        break
      case 5:
        this.bdotEndDate = new Date(this.inputBdotEndDate)
        break
      default:
        this.bdotEndDate = new Date()
        this.bdotStartDate = new Date(
          new Date().setDate(this.bdotEndDate.getDate() - 0.1),
        )
        this.isRealTime = true
        this.updateInputs()
        break
    }

    this.numBdotStartDate = this.converterDateToNumber(this.bdotStartDate)
    this.numBdotEndDate = this.converterDateToNumber(this.bdotEndDate)
  }
  btnPower(opcion: number) {
    this.isRealTime = false
    //console.log('------------------------------------------------')
   // console.log(this.EPSEndDate)
    switch (opcion) {
      case 7:
        this.powerEndDate = new Date()
        this.powerStartDate = new Date(
          new Date().setDate(this.powerEndDate.getDate() - 7),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 7);
        this.isRealTime = true
        this.updateInputs()
        break
      case 3:
        this.powerEndDate = new Date()
        this.powerStartDate = new Date(
          new Date().setDate(this.powerEndDate.getDate() - 3),
        )
        //this.EPSstartDate.setDate(this.EPSEndDate.getDate() - 3);
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

  //metodos para calcular fechas
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
          

          this.statusEndDate = new Date()
          this.numStatusEndDate = this.converterDateToNumber(this.statusEndDate)

          this.wheelsEndDate = new Date()
          this.numWheelsEndDate = this.converterDateToNumber(this.wheelsEndDate)

          this.controlEndDate = new Date()
          this.numControlEndDate = this.converterDateToNumber(this.controlEndDate)

          this.torquerEndDate = new Date()
          this.numTorquerEndDate = this.converterDateToNumber(this.torquerEndDate)

          this.bdotEndDate = new Date()
          this.numBdotEndDate = this.converterDateToNumber(this.bdotEndDate)

          this.powerEndDate = new Date()
          this.numPowerEndDate = this.converterDateToNumber(this.powerEndDate)

        }

        // FIX ME
        this.r = 1
        this.getDataGraphStatus()
        this.getDataGraphWheels()
        this.getDataGraphControl()
        this.getDataGraphTorquer()
        this.getDataGraphBdot()
        this.getDataGraphPower()

      })
  }

  //========================================================================
  //Grafica de Mode Status
  //========================================================================
  getDataGraphStatus() {
    // Consumo api backend
    forkJoin({
      reqAcs_mode: this.echarService.getDataSatelliteTimeName(
        4,
        'acs_mode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqAcs_dmode: this.echarService.getDataSatelliteTimeName(
        4,
        'acs_dmode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqAds_mode: this.echarService.getDataSatelliteTimeName(
        4,
        'ads_mode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqAds_dmode: this.echarService.getDataSatelliteTimeName(
        4,
        'ads_dmode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqEphem_mode: this.echarService.getDataSatelliteTimeName(
        4,
        'ephem_mode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqEphem_dmode: this.echarService.getDataSatelliteTimeName(
        4,
        'ephem_dmode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqYspin_mode: this.echarService.getDataSatelliteTimeName(
        4,
        'yspin_mode',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqStatus_bdot: this.echarService.getDataSatelliteTimeName(
        4,
        'status_bdot',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqStatus_igrf: this.echarService.getDataSatelliteTimeName(
        4,
        'status_igrf',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqStatus_sgp4: this.echarService.getDataSatelliteTimeName(
        4,
        'status_sgp4',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqStatus_ukf: this.echarService.getDataSatelliteTimeName(
        4,
        'status_ukf',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqStatus_run: this.echarService.getDataSatelliteTimeName(
        4,
        'status_run',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqLooptime: this.echarService.getDataSatelliteTimeName(
        4,
        'looptime',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      reqMaxlooptime: this.echarService.getDataSatelliteTimeName(
        4,
        'maxlooptime',
        this.numStatusStartDate,
        this.numStatusEndDate,         
      ),
      
    }).subscribe(
      ({
        reqAcs_mode,
        reqAcs_dmode,
        reqAds_mode,
        reqAds_dmode,
        reqEphem_mode,
        reqEphem_dmode,
        reqYspin_mode,
        reqStatus_bdot,
        reqStatus_igrf,
        reqStatus_sgp4,
        reqStatus_ukf,
        reqStatus_run,
        reqLooptime,
        reqMaxlooptime,
      }: any) => {
        this.optionModeStatus = {
          title: {
            text: 'ADCS Mode Status',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['acs_mode', 'acs_dmode', 'ads_mode', 'ads_dmode', 'ephem_mode', 'ephem_dmode', 'yspin_mode', 'status_bdot', 'status_igrf', 'status_sgp4','status_ukf','status_run','looptime','maxlooptime'],
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
              data: reqAcs_mode.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 0,
              max: 220,
              interval: 30,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'acs_mode',
              data: reqAcs_mode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'acs_dmode',
              data: reqAcs_dmode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ads_mode',
              data: reqAds_mode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ads_dmode',
              data: reqAds_dmode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'reqEphem_mode',
              data: reqAcs_dmode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'reqEphem_dmode',
              data: reqAcs_dmode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'yspin_mode',
              data: reqYspin_mode.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'status_bdot',
              data: reqStatus_bdot.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'status_igrf',
              data: reqStatus_igrf.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'status_sgp4',
              data: reqStatus_sgp4.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'status_ukf',
              data: reqStatus_ukf.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'status_run',
              data: reqStatus_run.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'looptime',
              data: reqLooptime.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'maxlooptime',
              data: reqMaxlooptime.data,
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
  //Grafica de ADCS Wheels
  //========================================================================
  getDataGraphWheels() {
    // Consumo api backend
    forkJoin({
      reqWheel_speed0: this.echarService.getDataSatelliteTime(
        4,
        'wheel_speed',
        0,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_speed1: this.echarService.getDataSatelliteTime(
        4,
        'wheel_speed',
        1,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_speed2: this.echarService.getDataSatelliteTime(
        4,
        'wheel_speed',
        2,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_speed3: this.echarService.getDataSatelliteTime(
        4,
        'wheel_speed',
        3,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),

      reqCtrl_mwspeed0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwspeed',
        0,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqCtrl_mwspeed1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwspeed',
        1,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqCtrl_mwspeed2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwspeed',
        2,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqCtrl_mwspeed3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwspeed',
        3,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),

      reqCtrl_mwtorque0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        0,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqCtrl_mwtorque1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        1,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqCtrl_mwtorque2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        2,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqCtrl_mwtorque3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        3,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),

      reqWheel_cur0: this.echarService.getDataSatelliteTime(
        4,
        'wheel_cur',
        0,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_cur1: this.echarService.getDataSatelliteTime(
        4,
        'wheel_cur',
        1,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_cur2: this.echarService.getDataSatelliteTime(
        4,
        'wheel_cur',
        2,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_cur3: this.echarService.getDataSatelliteTime(
        4,
        'wheel_cur',
        3,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),

      reqWheel_temp0: this.echarService.getDataSatelliteTime(
        4,
        'wheel_temp',
        0,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_temp1: this.echarService.getDataSatelliteTime(
        4,
        'wheel_temp',
        1,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_temp2: this.echarService.getDataSatelliteTime(
        4,
        'wheel_temp',
        2,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      reqWheel_temp3: this.echarService.getDataSatelliteTime(
        4,
        'wheel_temp',
        3,      
        this.numWheelsStartDate,
        this.numWheelsEndDate, 
      ),
      
    }).subscribe(
      ({
        reqWheel_speed0,
        reqWheel_speed1,
        reqWheel_speed2,
        reqWheel_speed3,
        reqCtrl_mwspeed0,
        reqCtrl_mwspeed1,
        reqCtrl_mwspeed2,
        reqCtrl_mwspeed3,
        reqCtrl_mwtorque0,
        reqCtrl_mwtorque1,
        reqCtrl_mwtorque2,
        reqCtrl_mwtorque3,
        reqWheel_cur0,
        reqWheel_cur1,
        reqWheel_cur2,
        reqWheel_cur3,
        reqWheel_temp0,
        reqWheel_temp1,
        reqWheel_temp2,
        reqWheel_temp3,
        
      }: any) => {
        this.optionWheels = {
          title: {
            text: 'ADCS Wheels',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['wheel_speed[0]', 'wheel_speed[1]', 'wheel_speed[2]', 'wheel_speed[3]', 'ctrl_mwspeed[0]', 'ctrl_mwspeed[1]', 'ctrl_mwspeed[2]', 'ctrl_mwspeed[3]', 'ctrl_mwtorque[0]', 'ctrl_mwtorque[1]', 'ctrl_mwtorque[2]', 'ctrl_mwtorque[3]', 'wheel_cur[0]', 'wheel_cur[1]', 'wheel_cur[2]', 'wheel_cur[3]', 'wheel_temp[0]', 'wheel_temp[1]', 'wheel_temp[2]', 'wheel_temp[3]'],
            top: '10%',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: '35%',
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
              data: reqWheel_speed0.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: -2000,
              max: 2000,
              interval: 400,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'wheel_speed[0]',
              data: reqWheel_speed0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'wheel_speed[1]',
              data: reqWheel_speed1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_speed[2]',
              data: reqWheel_speed2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_speed[3]',
              data: reqWheel_speed3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwspeed[0]',
              data: reqCtrl_mwspeed0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwspeed[1]',
              data: reqCtrl_mwspeed1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwspeed[2]',
              data: reqCtrl_mwspeed2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwspeed[3]',
              data: reqCtrl_mwspeed3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[0]',
              data: reqCtrl_mwtorque0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[1]',
              data: reqCtrl_mwtorque1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[2]',
              data: reqCtrl_mwtorque2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[3]',
              data: reqCtrl_mwtorque3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_cur[0]',
              data: reqWheel_cur0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_cur[1]',
              data: reqWheel_cur1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_cur[2]',
              data: reqWheel_cur2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_cur[3]',
              data: reqWheel_cur3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_temp[0]',
              data: reqWheel_temp0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_temp[1]',
              data: reqWheel_temp1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_temp[2]',
              data: reqWheel_temp2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'wheel_temp[3]',
              data: reqWheel_temp3.data,
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
  //Grafica de ADCS Control
  //========================================================================
  getDataGraphControl() {
    // Consumo api backend
    forkJoin({
      reqCtrl_refq0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_refq',
        0,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_refq1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_refq',
        1,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_refq2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_refq',
        2,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_refq3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_refq',
        3,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),

      reqCtrl_errq0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errq',
        0,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_errq1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errq',
        1,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_errq2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errq',
        2,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_errq3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errq',
        3,      
        this.numControlStartDate,
        this.numControlEndDate,
      ),

      reqCtrl_errrate0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errrate',
        0,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_errrate1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errrate',
        1,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_errrate2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errrate',
        2,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_errrate3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_errrate',
        3,      
        this.numControlStartDate,
        this.numControlEndDate,
      ),

      reqCtrl_mwtorque0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        0,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_mwtorque1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        1,      
        this.numControlStartDate,
        this.numControlEndDate,
      ),
      reqCtrl_mwtorque2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        2,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      reqCtrl_mwtorque3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_mwtorque',
        3,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),

      reqCtrl_M0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        0,      
        this.numControlStartDate,
        this.numControlEndDate,  
      ),
      reqCtrl_M1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        1,      
        this.numControlStartDate,
        this.numControlEndDate,  
      ),
      reqCtrl_M2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        2,      
        this.numControlStartDate,
        this.numControlEndDate,  
      ),
      reqCtrl_M3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        3,      
        this.numControlStartDate,
        this.numControlEndDate, 
      ),
      
    }).subscribe(
      ({
        reqCtrl_refq0,
        reqCtrl_refq1,
        reqCtrl_refq2,
        reqCtrl_refq3,
        reqCtrl_errq0,
        reqCtrl_errq1,
        reqCtrl_errq2,
        reqCtrl_errq3,
        reqCtrl_errrate0,
        reqCtrl_errrate1,
        reqCtrl_errrate2,
        reqCtrl_errrate3,
        reqCtrl_mwtorque0,
        reqCtrl_mwtorque1,
        reqCtrl_mwtorque2,
        reqCtrl_mwtorque3,
        reqCtrl_M0,
        reqCtrl_M1,
        reqCtrl_M2,
        reqCtrl_M3,
       
      }: any) => {
        this.optionControl = {
          title: {
            text: 'ADCS Control',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['ctrl_refq[0]', 'ctrl_refq[1]', 'ctrl_refq[2]', 'ctrl_refq[3]', 'ctrl_errq[0]', 'ctrl_errq[1]', 'ctrl_errq[2]', 'ctrl_errq[3]','ctrl_errrate[0]', 'ctrl_errrate[1]', 'ctrl_errrate[2]', 'ctrl_errrate[3]','ctrl_mwtorque[0]', 'ctrl_mwtorque[1]', 'ctrl_mwtorque[2]', 'ctrl_mwtorque[3]', 'ctrl_M[0]', 'ctrl_M[1]', 'ctrl_M[2]', 'ctrl_M[3]'],
            top: '10%',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '35%',
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
              data: reqCtrl_refq0.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: -60,
              max: 40,
              interval: 20,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'ctrl_refq[0]',
              data: reqCtrl_refq0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'ctrl_refq[1]',
              data: reqCtrl_refq1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_refq[2]',
              data: reqCtrl_refq2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_refq[3]',
              data: reqCtrl_refq3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errq[0]',
              data: reqCtrl_errq0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errq[1]',
              data: reqCtrl_errq1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errq[2]',
              data: reqCtrl_errq2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errq[3]',
              data: reqCtrl_errq3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'ctrl_errrate[0]',
              data: reqCtrl_errrate0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errrate[1]',
              data: reqCtrl_errrate1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errrate[2]',
              data: reqCtrl_errrate2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_errrate[3]',
              data: reqCtrl_errrate3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'ctrl_mwtorque[0]',
              data: reqCtrl_mwtorque0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[1]',
              data: reqCtrl_mwtorque1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[2]',
              data: reqCtrl_mwtorque2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_mwtorque[3]',
              data: reqCtrl_mwtorque3.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[0]',
              data: reqCtrl_M0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[1]',
              data: reqCtrl_M1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[2]',
              data: reqCtrl_M2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[3]',
              data: reqCtrl_M3.data,
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
  //Grafica de ADCS Torquer
  //========================================================================
  getDataGraphTorquer() {
    // Consumo api backend
    forkJoin({
      reqTorquer_duty0: this.echarService.getDataSatelliteTime(
        4,
        'torquer_duty',
        0,      
        this.numTorquerStartDate,
        this.numTorquerEndDate, 
      ),
      reqTorquer_duty1: this.echarService.getDataSatelliteTime(
        4,
        'torquer_duty',
        1,      
        this.numTorquerStartDate,
        this.numTorquerEndDate,  
      ),
      reqTorquer_duty2: this.echarService.getDataSatelliteTime(
        4,
        'torquer_duty',
        2,      
        this.numTorquerStartDate,
        this.numTorquerEndDate,  
      ),  

      reqCtrl_M0: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        0,      
        this.numTorquerStartDate,
        this.numTorquerEndDate,   
      ),
      reqCtrl_M1: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        1,      
        this.numTorquerStartDate,
        this.numTorquerEndDate, 
      ),
      reqCtrl_M2: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        2,      
        this.numTorquerStartDate,
        this.numTorquerEndDate,   
      ),
      reqCtrl_M3: this.echarService.getDataSatelliteTime(
        4,
        'ctrl_M',
        3,      
        this.numTorquerStartDate,
        this.numTorquerEndDate,  
      ),
      
    }).subscribe(
      ({
        reqTorquer_duty0,
        reqTorquer_duty1,
        reqTorquer_duty2,
        reqCtrl_M0,
        reqCtrl_M1,
        reqCtrl_M2,
        reqCtrl_M3,
      }: any) => {
        this.optionTorquer = {
          title: {
            text: 'ADCS Torquer',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['torquer_duty[0]', 'torquer_duty[1]', 'torquer_duty[2]','ctrl_M[0]', 'ctrl_M[1]', 'ctrl_M[2]', 'ctrl_M[3]'],
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
              data: reqTorquer_duty0.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: -60,
              max: 40,
              interval: 20,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'torquer_duty[0]',
              data: reqTorquer_duty0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'torquer_duty[1]',
              data: reqTorquer_duty1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'torquer_duty[2]',
              data: reqTorquer_duty2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'ctrl_M[0]',
              data: reqCtrl_M0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[1]',
              data: reqCtrl_M1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[2]',
              data: reqCtrl_M2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'ctrl_M[3]',
              data: reqCtrl_M3.data,
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
  //Grafica de ADCS Bdot
  //========================================================================
  getDataGraphBdot() {
    // Consumo api backend
    forkJoin({
      reqBdot_rate0: this.echarService.getDataSatelliteTime(
        4,
        'bdot_rate',
        0,      
        this.numBdotStartDate,
        this.numBdotEndDate, 
      ),
      reqBdot_rate1: this.echarService.getDataSatelliteTime(
        4,
        'bdot_rate',
        1,      
        this.numBdotStartDate,
        this.numBdotEndDate,  
      ),
      
      reqBdot_detumb: this.echarService.getDataSatelliteTimeName(
        4,
        'bdot_detumb',  
        this.numBdotStartDate,
        this.numBdotEndDate,  
      ),  

      reqGyro_trend0: this.echarService.getDataSatelliteTime(
        4,
        'gyro_trend',
        0,      
        this.numBdotStartDate,
        this.numBdotEndDate,   
      ),
      reqGyro_trend1: this.echarService.getDataSatelliteTime(
        4,
        'gyro_trend',
        1,      
        this.numBdotStartDate,
        this.numBdotEndDate, 
      ),
      reqGyro_trend2: this.echarService.getDataSatelliteTime(
        4,
        'gyro_trend',
        2,      
        this.numBdotStartDate,
        this.numBdotEndDate,   
      ),
      
      reqGyro0: this.echarService.getDataSatelliteTime(
        4,
        'gyro',
        0,      
        this.numBdotStartDate,
        this.numBdotEndDate,  
      ),
      reqGyro1: this.echarService.getDataSatelliteTime(
        4,
        'gyro',
        1,      
        this.numBdotStartDate,
        this.numBdotEndDate,  
      ),
      reqGyro2: this.echarService.getDataSatelliteTime(
        4,
        'gyro',
        2,      
        this.numBdotStartDate,
        this.numBdotEndDate,  
      ),
      
    }).subscribe(
      ({
        reqBdot_rate0,
        reqBdot_rate1,
        reqBdot_detumb,
        reqGyro_trend0,
        reqGyro_trend1,
        reqGyro_trend2,
        reqGyro0,
        reqGyro1,
        reqGyro2,
      }: any) => {
        this.optionBdot = {
          title: {
            text: 'ADCS bdot',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['bdot_rate[0]', 'bdot_rate[1]', 'bdot_rate','gyro_trend[0]', 'gyro_trend[1]', 'gyro_trend[2]','gyro[0]', 'gyro[1]', 'gyro[2]'],
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
              data: reqBdot_rate0.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: -0.001,
              max: 0.001,
              interval: 0.0001,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: '',
              min: -0.5,
              max: 0.5,
              interval: 0.1,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'bdot_rate[0]',
              data: reqBdot_rate0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'bdot_rate[1]',
              data: reqBdot_rate1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'bdot_detumb',
              data: reqBdot_detumb.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'gyro_trend[0]',
              data: reqGyro_trend0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'gyro_trend[1]',
              data: reqGyro_trend1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'gyro_trend[2]',
              data: reqGyro_trend2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'gyro[0]',
              yAxisIndex: 1,
              data: reqGyro0.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'gyro[1]',
              yAxisIndex: 1,
              data: reqGyro1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'gyro[2]',
              yAxisIndex: 1,
              data: reqGyro2.data,
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
  //Grafica de ADCS Bdot
  //========================================================================
  getDataGraphPower() {
    // Consumo api backend
    forkJoin({
      reqPwrGSSB1: this.echarService.getDataSatelliteTimeName(
        4,
        'pwrGSSB1',    
        this.numPowerStartDate,
        this.numPowerEndDate, 
      ),
      reqPwrGSSB2: this.echarService.getDataSatelliteTimeName(
        4,
        'pwrGSSB2',    
        this.numPowerStartDate,
        this.numPowerEndDate, 
      ),
      
      reqPwrPWM: this.echarService.getDataSatelliteTimeName(
        4,
        'pwrPWM',  
        this.numPowerStartDate,
        this.numPowerEndDate,  
      ),  

      reqCurGSSB1: this.echarService.getDataSatelliteTimeName(
        4,
        'curGSSB1',    
        this.numPowerStartDate,
        this.numPowerEndDate, 
      ),
      reqCurGSSB2: this.echarService.getDataSatelliteTimeName(
        4,
        'curGSSB2',    
        this.numPowerStartDate,
        this.numPowerEndDate, 
      ),
      
      reqCurPWM: this.echarService.getDataSatelliteTimeName(
        4,
        'curPWM',  
        this.numPowerStartDate,
        this.numPowerEndDate,  
      ),  

      
      
    }).subscribe(
      ({
        reqPwrGSSB1,
        reqPwrGSSB2,
        reqPwrPWM,
        reqCurGSSB1,
        reqCurGSSB2,
        reqCurPWM,
      }: any) => {
        this.optionPower = {
          title: {
            text: 'ADCS Power Status',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['pwrGSSB1', 'pwrGSSB2', 'pwrPWM','curGSSB1', 'curGSSB2', 'curPWM'],
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
              data: reqPwrGSSB1.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              min: 0,
              max: 260,
              interval: 40,
              axisLabel: {
                formatter: '{value} ',
              },
            },
            {
              type: 'value',
              name: '',
              min: -0.5,
              max: 0.5,
              interval: 0.1,
              axisLabel: {
                formatter: '{value} ',
              },
            },
          ],
          series: [
            {
              name: 'pwrGSSB1',
              data: reqPwrGSSB1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'pwrGSSB2',
              data: reqPwrGSSB2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'pwrPWM',
              data: reqPwrPWM.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },

            {
              name: 'curGSSB1',
              data: reqCurGSSB1.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'curGSSB2',
              data: reqCurGSSB2.data,
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' '
                },
              },
            },
            {
              name: 'curPWM',
              data: reqCurPWM.data,
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
