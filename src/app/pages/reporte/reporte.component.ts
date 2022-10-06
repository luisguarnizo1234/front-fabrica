import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { forkJoin, map, share, Subscription, timer } from 'rxjs';
import { EchartService } from 'src/app/services/echart.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @ViewChild('estado') celdaEstado: ElementRef;

  isRealTime: boolean
  subscription: Subscription
  rxTime = new Date()
  timeUpdate = 10000
  r = 0

  nMaquinas = 0;
  nSensores = 0;

  myCar = new Object();

 

  options!: EChartsOption;
  //variables COM STATUS
  tot_rx_count = 0;

  currentTime = new Date() //fecha actual *1000 para hora normal
  
  startTime = new Date()
  endTime =  new Date()

  numStartTime: number
  numEndTime: number

  //===================================================
  //FEchas Formato String
  //===================================================
  
  inputComTempStartDate: string
  inputComTempEndDate: string

  //===================================================
  //botones g
  //===================================================
  comTempEndDate = new Date()
  comTempStartDate = new Date()

  //===================================================
  //Fecha en number o mili segundos
  //===================================================
  numComTempStartDate: number
  numComTempEndDate: number

  
  arrayObjetos: any[] = [];
 
  constructor(
    private echarService: EchartService,
    
  ) { }
  imprimirdate() {
    //console.log(this.inputStarDate);

    //Establecer fecha por defecto como la fecha actual
    this.btnComTemp(4)   
  }

  ngOnInit(): void {
    this.btnComTemp(0)
    this.getData()  
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

//agregar el onint destroy

updateInputs() {
    
  this.inputComTempEndDate = this.comTempEndDate.toISOString().slice(0, 16)
  this.inputComTempStartDate = this.comTempStartDate.toISOString().slice(0, 16)
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
        }
        console.log(this.tempSensor);
        console.log(this.tempMaquina);


        //const elementTd = this.celdaEstado.nativeElement;
        //console.log(elementTd);

        switch (this.tempMaquina) {

          case 'maquina 1':
            this.nMaquinas = 1;
            
            switch (this.tempSensor) {
              case 'sensor 1':
                  this.nSensores = 1
                  console.log('estoy en maquina 1 sensor 1');
                  
                break
              case 'sensor 2':
                  this.nSensores = 2
                  console.log('estoy en maquina 1 sensor 2');
                break
              case 'sensor 3':
                  this.nSensores = 3 
                  console.log('estoy en maquina 1 sensor 3');
                break
              case 'sensor 4':
                  this.nSensores = 4
                  console.log('estoy en maquina 1 sensor 4');
                break
            }

            break
          case 'maquina 2':
            this.nMaquinas = 2;

            switch (this.tempSensor) {
              case 'sensor 1':
                  this.nSensores = 1
                break
              case 'sensor 2':
                  this.nSensores = 2
                break
              case 'sensor 3':
                  this.nSensores = 3 
                break
              case 'sensor 4':
                  this.nSensores = 4
                break
            }
            break
          case 'maquina 3':
            this.nMaquinas = 3;

            switch (this.tempSensor) {
              case 'sensor 1':
                  this.nSensores = 1
                break
              case 'sensor 2':
                  this.nSensores = 2
                break
              case 'sensor 3':
                  this.nSensores = 3 
                break
              case 'sensor 4':
                  this.nSensores = 4
                break
            }
            break

          case 'maquina 4':
            this.nMaquinas = 1;

            switch (this.tempSensor) {
              case 'sensor 1':
                  this.nSensores = 1
                break
              case 'sensor 2':
                  this.nSensores = 2
                break
              case 'sensor 3':
                  this.nSensores = 3 
                break
              case 'sensor 4':
                  this.nSensores = 4
                break
            }
            break
        }



        this.getDataGraphComTemp(this.nMaquinas, this.nSensores)

        // FIX ME
        this.r = 1
        /* for ( var nMaquinas = 1; nMaquinas < 5; nMaquinas++) {
          for (  var nSensores = 1; nSensores < 5; nSensores++) {
            this.getDataGraphComTemp(nMaquinas, nSensores)
            //console.log(nMaquinas)
            //console.log(nSensores)
          }
          
        } */
        //this.getDataGraphComTemp()
      })
  }
  maquinas = ['maquina 1', 'maquina 2', 
              'maquina 3', 'maquina 4'];
  selected: string = 'maquina 1';

  tempMaquina: string = this.selected;

  sensores = ['sensor 1', 'sensor 2', 
              'sensor 3', 'sensor 4'];
  selected2: string = 'sensor 1';
  tempSensor: string = this.selected2;
  
  //metodos para calcular fechas
  converterDateToNumber(fecha: Date): number {
    return Math.round(fecha.getTime() / 1000)
  }


  getDataGraphComTemp(m:number, n: number) {
  
  
      forkJoin({      
        reqTot_rx_count: this.echarService.getDataSatelliteTime(
          n,
          'temperatura',
          m,
          this.numComTempStartDate,
          this.numComTempEndDate,
        ),
      }).subscribe(
        ({
          reqTot_rx_count,
          
        }: any) => {
      
          //var tot_rx_count = reqTot_rx_count;
          var datos = reqTot_rx_count.data;
          //var fecha = reqTot_rx_count.dates;
          

          for (let index = 0; index < datos.length; index++) {
            var tempEstado = 'bajo';
            var tempDato = reqTot_rx_count.data[index]
            if (tempDato<10) {
              tempEstado = 'Muy bajo'
              console.log('Estado');
              console.log(tempEstado);
              
            } 
            else if (tempDato>=10 && tempDato<23) {
              tempEstado = 'Bajo';
              console.log('Estado');
              console.log(tempEstado);

            }
            else if (tempDato>=23 && tempDato<33) {
              tempEstado = 'Medio bajo';
              console.log('Estado');
              console.log(tempEstado);
            }
            else if (tempDato>=33 && tempDato<50) {
              tempEstado = 'Medio';
              console.log('Estado');
              console.log(tempEstado);
            } 
            else if (tempDato>=50 && tempDato<66) {
              tempEstado = 'Medio alto';
              console.log('Estado');
              console.log(tempEstado);
            } 
            else if (tempDato>=66 && tempDato<83) {
              tempEstado = 'Alto';
              console.log('Estado');
              console.log(tempEstado);
            }
            else if (tempDato>=83) {
              tempEstado = 'Muy alto';
              console.log('Estado');
              console.log(tempEstado);
            } else {
              tempEstado = 'indefinido';
              console.log('Estado');
              console.log(tempEstado);
            }
            
            this.arrayObjetos[index] = {
              maquina: m,
              sensor: n,
              estado: tempEstado,
              valor: tempDato

            }
            
          }
          console.log('ArrayObjeto:');
          console.log(this.arrayObjetos);

          //console.log(datos.length)
          //var sensor
          /* console.log('valortemperatura');
          console.log(reqTot_rx_count.data[0]);
          console.log('fecha:');
          console.log(reqTot_rx_count.dates[0]);
          console.log('maquina');
          console.log(m);
          console.log('sensor');
          console.log(n); */
          
  
        },
      );  
  

    }

  cathMaquina() {
    this.tempMaquina = this.selected;
    if (this.selected == 'maquina 1') {
      console.log('lo logré');
    }
    //console.log(this.tempMaquina);
  }

  cathSensor() {
    this.tempSensor = this.selected2;
    //console.log(this.tempSensor);
  }
 
}
export interface Data {
  message: string;
}
export interface Telemetry {
  id: string;
  node: string;
}