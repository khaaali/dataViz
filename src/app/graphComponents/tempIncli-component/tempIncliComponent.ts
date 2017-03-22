import { Component } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import {MyData} from '../../StructData';


declare const CanvasJS: any;

@Component({

    selector: 'app-temperature-inclination-component',
    templateUrl: './tempIncliComponent.html',
    providers: [ HttpModule,MySqlService ]

})



export class TemperatureAndInclinationComponent {

   public dataTempIncli;

   myData:MyData[];

  
  constructor(private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router) { }

    ngOnInit(): any {
        
        
   this.route.params 
       .switchMap((params: Params) => this._MySqlService.getTemperatureInclination(String(params['id'])))
       .subscribe(myData => {this.myData=myData; 
                               
                               //console.log(testings);
        let dataTempIncli  = myData;                                  
  this.dataTempIncli= myData;

  //console.log(dataTempIncli);

  
//let dataTempIncli=this.datasetTempIncli;
  const chart = new CanvasJS.Chart("chartContainer3", 

        {
      animationEnabled: true,      
      zoomEnabled: true,
      theme: "theme",      
      backgroundColor: "#F1F1F1",
      legend: 
        {
            //dockInsidePlotArea: true,
            verticalAlign: "top",
            horizontalAlign: "centre"               
        },





      title:{
       text: "Temperature and Inclination", 
       fontSize: 30,
       },
       subtitles:[
        {
            //text: "Mac-ID: ce-35",
            //Uncomment properties below to see how they behave
            //fontColor: "red",
            fontSize: 20
        }
        ],



      dataPointMaxWidth: 10, 
      axisX:{
        title: "Time(sec)",     
        //tickColor: "red",
        //tickLength: 5,
        titleFontSize: 20,
        tickThickness: 2,
        gridDashType:"dot",
        interlacedColor: "#F1F1F1" 
      },
      axisY:{
        title: "Temperature(°C)",
        tickLength: 15,
        titleFontSize: 20,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

      axisY2:[{
      title: "Inclination",
      
    }],


     data: [
             {        
      type: "line",
      //color: "rgba(12,143,221,.2)",
      color: "rgba(12,143,221,1)",             

      //type: "area",
      lineThickness: 1,
      showInLegend: true,
      legendText: "Temperature",
      xValueType: "dateTime",
      dataPoints: dataTempIncli               
 
              },
      {
 
      type: "column",
      axisYType: "secondary",
      color: "rgba(255,12,32,.5)",         
      //type: "column",
      showInLegend: true,
      legendText: "Inclination",
      xValueType: "dateTime",
      dataPoints: dataTempIncli

            }]
      });

    chart.render();





		function rangeChange(e) {
			console.log(e);
		}	

   });
}

}




                           
