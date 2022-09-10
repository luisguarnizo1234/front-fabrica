import { Component, Input, OnInit } from '@angular/core'
import { EChartsOption } from 'echarts'
import { map, share, Subscription, timer } from 'rxjs'
import { EchartService } from 'src/app/services/echart.service'
import { data } from 'src/assets/echart/basic-line-chart-data'

import { BasicEchartLineModel } from '../echart.model'

@Component({
  selector: 'app-basic-line-echarts',
  templateUrl: './basic-line-echarts.component.html',
  styleUrls: ['./basic-line-echarts.component.css'],
})
export class BasicLineEchartsComponent implements OnInit {

  @Input() factor: number = 0;

  options!: EChartsOption
  options2!: EChartsOption
  data: any
  //actualizar datos
  subscription: Subscription
  rxTime = new Date()
  

  constructor(private echartService: EchartService) {}

  ngOnInit(): void {
    /*this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share(),
      )

       .subscribe((time) => {
        this.rxTime = time
        console.log(time)


        this.echartService
          .getDataSatellite(1, 'temperatura')
          .subscribe((res: any) => {
            var d = new Date(0) // The 0 there is the key, which sets the date to the epoch

            let r = Math.random()*this.factor;
            console.log(r);
            d.setUTCSeconds(res.dates[0])
            console.log(res.data)
            this.options = {
              title: {
                text: 'temp2',
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
                  data: res.data.map((x:any) => x*r),
                  type: 'line',
                },
              ],
            }
          })
      }) */
    //________________________________________________________________
    this.echartService.getDataSatellite(2, 'temperatura').subscribe((res: any) => {
      var d = new Date(0) // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(res.dates[0])
      console.log(d)
      console.log('hola')
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
      }
    })

    this.echartService
      .getDataSatellite(6, 'image-count')
      .subscribe((res: any) => {
        this.options2 = {
          title: {
            text: 'Stacked Line',
          },
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
        }
      })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}