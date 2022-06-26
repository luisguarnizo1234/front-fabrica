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
  tot_tx_count = 0;
  last_rssi = 0;
  last_rferr= 0;
  bgnd_rssi = 0;
  boot_count = 0;
  temp_pa = 0;
  temp_brd = 0;
  boot_cause = 0;
  last_contact = 0;
  //variables EPS STATUS
  WDE_curout = 0;
  GPS_curout = 0;
  AX100_curout = 0;
  CAM_curout = 0;
  OBC_curout = 0;
  ADCS_curout = 0;
  EPS_vbatt = 0;
  cursun = 0;
  cursys = 0;
  //variables Boot Count
  ADCS_boot_count = 0;
  OBC_boot_count = 0;
  EPS_boot_count= 0;
  CAM_boot_count = 0;
  COM_boot_count = 0;
  //variables MISC
  image_count = 0;
  gps_pos0 = 0;
  gps_pos1 = 0;
  gps_pos2 = 0;
  cntWdtGnd = 0;
  wdtGndS = 0;

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
    // this.echarService.getProduct().subscribe((data) => {
    //   this.varMessage = data.message!;
    // });
    

    //llamado al metodo que conecta con el API enviando el parametro nodo y varibale
/*     this.productsService.getTelemetries().subscribe((data) => {
      //console.log(data);
    }); */

/*  
    this.echarService
    .getDataSatellite(6, 'uptime')
    .subscribe((res:any) => {
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(res.dates[0]);
      ////console.log(d)
      this.options = {
        xAxis: {
          type: 'category',
          data: res.dates,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: res.data,
            type: 'line',
          },
        ],
      };
    });
*/
    //obtener datos del COM AX100
    //===============================================================
    
    this.startTime = new Date(
      new Date().setDate(this.endTime.getDate() - 0.1),
    )
    //convertir fechas a segundos
    this.numStartTime = this.converterDateToNumber(this.startTime)
    this.numEndTime = this.converterDateToNumber(this.endTime)
    

    forkJoin({
      /* reqTot_rx_count: this.echarService.getDataSatellitewithout(
        5,
        'tot_rx_count',
        this.numEndTime,
        this.numStartTime,
      ),  */
      
      reqTot_rx_count: this.echarService.getDataSatelliteFirstDataName(5, 'tot_rx_count'),
      reqTot_tx_count: this.echarService.getDataSatelliteFirstDataName(5, 'tot_tx_count'),
      reqLast_rssi: this.echarService.getDataSatelliteFirstDataName(5, 'last_rssi'),
      reqLast_rferr: this.echarService.getDataSatelliteFirstDataName(5, 'last_rferr'),
      reqBgnd_rssi: this.echarService.getDataSatelliteFirstDataName(5, 'bgnd_rssi'),
      reqBoot_count: this.echarService.getDataSatelliteFirstDataName(5, 'boot_count'),
      reqTemp_pa: this.echarService.getDataSatelliteFirstDataName(5, 'temp_pa'),
      reqTemp_brd: this.echarService.getDataSatelliteFirstDataName(5, 'temp_brd'),
      reqBoot_cause: this.echarService.getDataSatelliteFirstDataName(5, 'boot_cause'),
      reqLast_contact: this.echarService.getDataSatelliteFirstDataName(5, 'last_contact'),
    
    }).subscribe(
      ({
        reqTot_rx_count,
        reqTot_tx_count,
        reqLast_rssi,
        reqLast_rferr,
        reqBgnd_rssi,
        reqBoot_count,
        reqTemp_pa,
        reqTemp_brd,
        reqBoot_cause,
        reqLast_contact,
      }: any) => {
    
        var tot_rx_count = reqTot_rx_count.val;
        var tot_tx_count = reqTot_tx_count.val;
        var last_rssi = reqLast_rssi.val;
        var last_rferr = reqLast_rferr.val;
        var bgnd_rssi = reqBgnd_rssi.val;
        var boot_count = reqBoot_count.val;
        var temp_pa = reqTemp_pa.val;
        var temp_brd = reqTemp_brd.val;
        var boot_cause = reqBoot_cause.val;
        var last_contact = reqLast_contact.val;


        this.tot_rx_count = tot_rx_count;
        this.tot_tx_count = tot_tx_count;
        this.last_rssi = last_rssi;
        this.last_rferr = last_rferr;
        this.bgnd_rssi = bgnd_rssi;
        this.boot_count = boot_count;
        this.temp_pa = temp_pa;
        this.temp_brd = temp_brd;
        this.boot_cause = boot_cause;
        this.last_contact = last_contact;


      },
    );  

    //Datos del EPS
    forkJoin({
      reqCuroutWDE: this.echarService.getDataSatelliteFirstDataIndex(1, 'curout', 0),
      reqCuroutGPS: this.echarService.getDataSatelliteFirstDataIndex(1, 'curout', 1),
      reqCuroutAX100: this.echarService.getDataSatelliteFirstDataIndex(1, 'curout', 2),
      reqCuroutCAM: this.echarService.getDataSatelliteFirstDataIndex(1, 'curout', 3),
      reqCuroutOBC: this.echarService.getDataSatelliteFirstDataIndex(1, 'curout', 4),
      reqCuroutADCS: this.echarService.getDataSatelliteFirstDataIndex(1, 'curout', 5),
      reqVbatt: this.echarService.getDataSatelliteFirstDataName(1, 'vbatt'),
      reqCursun: this.echarService.getDataSatelliteFirstDataName(1, 'cursun'),
      reqCursys: this.echarService.getDataSatelliteFirstDataName(1, 'cursys'),
    }).subscribe(
      ({
        reqCuroutWDE,
        reqCuroutGPS,
        reqCuroutAX100,
        reqCuroutCAM,
        reqCuroutADCS,
        reqCuroutOBC,
        reqVbatt,
        reqCursun,
        reqCursys,
      }: any) => {
        var curoutWDE = reqCuroutWDE.val;
        var curoutGPS = reqCuroutGPS.val;
        var curoutAX100 = reqCuroutAX100.val;
        var curoutCAM = reqCuroutCAM.val;
        var curoutADCS = reqCuroutADCS.val;
        var curoutOBC = reqCuroutOBC.val;
        var vbatt = reqVbatt.val;
        var cursun = reqCursun.val;
        var cursys = reqCursys.val;

        this.WDE_curout = curoutWDE;
        this.GPS_curout = curoutGPS;
        this.AX100_curout = curoutAX100;
        this.CAM_curout = curoutCAM;
        this.ADCS_curout = curoutADCS;
        this.OBC_curout = curoutOBC;
        this.EPS_vbatt = vbatt;
        this.cursun = cursun;
        this.cursys = cursys;

      },
    )

    //obtener datos del boot count
    //===============================================================
    forkJoin({
      reqADCS_boot_count: this.echarService.getDataSatelliteFirstDataName(4, 'boot_count'),
      reqOBC_boot_count: this.echarService.getDataSatelliteFirstDataName(1, 'boot_count'),
      reqEPS_boot_count: this.echarService.getDataSatelliteFirstDataName(1, 'cntBoot'),
      reqCAM_boot_count: this.echarService.getDataSatelliteFirstDataName(6, 'boot-count'),
      reqCOM_boot_count: this.echarService.getDataSatelliteFirstDataName(5, 'boot_count'),
      
    
    }).subscribe(
      ({
        reqADCS_boot_count,
        reqOBC_boot_count,
        reqEPS_boot_count,
        reqCAM_boot_count,
        reqCOM_boot_count,

      }: any) => {
        ////console.log(reqADCS_boot_count);
        
        var ADCS_boot_count = reqADCS_boot_count.val;
        var OBC_boot_count = reqOBC_boot_count.val;
        var EPS_boot_count = reqEPS_boot_count.val;
        var CAM_boot_count = reqCAM_boot_count.val;
        var COM_boot_count = reqCOM_boot_count.val;

        this.ADCS_boot_count = ADCS_boot_count;
        this.OBC_boot_count = OBC_boot_count;
        this.EPS_boot_count = EPS_boot_count;
        this.CAM_boot_count = CAM_boot_count;
        this.COM_boot_count = COM_boot_count;
      },
    );  
    //obtener datos del MISC
    //===============================================================
    forkJoin({
      //reqGps_pos0: this.echarService.getDataSatelliteFirstDataIndex(4, 'gps_pos', 0),
      //reqGps_pos1: this.echarService.getDataSatelliteFirstDataIndex(4, 'gps_pos', 1),
      //reqGps_pos2: this.echarService.getDataSatelliteFirstDataIndex(4, 'gps_pos', 2),
      reqImage_count: this.echarService.getDataSatelliteFirstDataName(6, 'image-count'),
      reqCntWdtGnd: this.echarService.getDataSatelliteFirstDataName(1, 'cntWdtGnd'),
      reqWdtGndS: this.echarService.getDataSatelliteFirstDataName(1, 'wdtGndS'),
    
    }).subscribe(
      ({
        reqImage_count,
        //reqGps_pos0,
        //reqGps_pos1,
        //reqGps_pos2,
        reqCntWdtGnd,
        reqWdtGndS,

      }: any) => {
        //console.log(reqGps_pos0);

        var image_count = reqImage_count.val;
        //var gps_pos0 = reqGps_pos0.val;
        //var gps_pos1 = reqGps_pos1.val;
        //var gps_pos2 = reqGps_pos2.val;
        var cntWdtGnd = reqCntWdtGnd.val;
        var wdtGndS = reqWdtGndS.val;

        this.image_count = image_count;
        //this.gps_pos0 = gps_pos0;
        //this.gps_pos1 = gps_pos1;
        //this.gps_pos2 = gps_pos2;
        this.cntWdtGnd = cntWdtGnd;
        this.wdtGndS = wdtGndS;
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
