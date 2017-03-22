import { Component, OnInit } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import {MyData} from '../../StructData';


declare const CanvasJS: any;

@Component({
  selector: 'app-inclination-component',
  templateUrl: './inclination-component.html',
  styleUrls: ['./inclination-component.css'],
  providers: [ HttpModule,MySqlService ]
})



export class InclinationComponent implements OnInit {

  public dataIncli;

   myData:MyData[];

  
  constructor(private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router) { }

    ngOnInit(): any {
        
        
  this.route.params 
       .switchMap((params: Params) => this._MySqlService.getInclination(String(params['id'])))
       .subscribe(myData => {this.myData=myData;
                               
                               //console.log(testings);
          let dataIncli  = myData;
          this.dataIncli= myData;

 // console.log(this.datasetIncli);

  
//let dataIncli=this.datasetIncli;
  const chart = new CanvasJS.Chart("chartContainer2", 

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
       text: "Inclination", 
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
        title: "Inclination",
        tickLength: 15,
        titleFontSize: 20,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

     data: [
             {   
      type: "line",   
      //color: "lightcoral",
      color: "rgba(255,12,32,.5)",         
      //type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "Inclination",
      xValueType: "dateTime",
      dataPoints: dataIncli
                    
                           
              }]
      });

    chart.render();


		function rangeChange(e) {
			console.log(e);
		}	
    });
}

}


