import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../app.component';
import { BasicEchartLineModel } from '../components/echarts/line/echart.model';
import { Satellite } from '../models/satellite.model';

@Injectable({
  providedIn: 'root'
})
export class EchartService {
  
  private urlBase = 'https://app-backend-fabrica.herokuapp.com/v1';
  //private urlBase = 'http://localhost:8080/v1';

  constructor(private httpClient: HttpClient){}
  getbasicLineEchartData(): Observable <BasicEchartLineModel[]>{
    return this.httpClient.get<BasicEchartLineModel[]>('assets/echart/basic-line-chart-data.json');
  }
  // getProduct(){
  //   //this.httpClient.get('http://localhost:3000/products/55').subscribe((data)=>//console.log(data));
  //   return this.httpClient.get<Data>('http://localhost:8080/satellite/6/');
  // }

  getDataSatellite(node: number, variable: string){
    return this.httpClient.get<Satellite>(`${this.urlBase}/satellites/${node}/${variable}`)
  }


  getDataSatelliteIndex(node: number, variable: string, index: number){
    return this.httpClient.get<Satellite>(`${this.urlBase}/satellites/${node}/${variable}/${index}`)
  }

  getDataSatelliteTimeName(node: number, variable: string, startTime: number, endTime: number){

    //console.log(`${this.urlBase}/satellites/${node}/${variable}/${index}/${startTime}/${endTime}`);

    return this.httpClient.get<Satellite>(`${this.urlBase}/satellites/${node}/${variable}/${startTime}/${endTime}`)
  }

  getDataSatelliteTime(node: number, variable: string, index: number, startTime: number, endTime: number){

    //console.log(`${this.urlBase}/satellites/${node}/${variable}/${index}/${startTime}/${endTime}`);

    return this.httpClient.get<Satellite>(`${this.urlBase}/satellites/${node}/${variable}/${index}/${startTime}/${endTime}`)
  }

  //End points para traer el primer dato por Index y por Name
  getDataSatelliteFirstDataIndex(node: number, variable: string, index: number){
    return this.httpClient.get<Satellite>(`${this.urlBase}/satellites/one/${node}/${variable}/${index}`)
  }

  getDataSatelliteFirstDataName(node: number, variable: string){
    return this.httpClient.get<Satellite>(`${this.urlBase}/satellites/one/${node}/${variable}`)
  }

}

