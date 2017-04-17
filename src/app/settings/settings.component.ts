import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/Rx';

import { MySqlService } from '../app.service';
import {MyData} from '../StructData';
import {Thresholds} from '../Threshold';
import {setThreshold} from '../setThresholds';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [ HttpModule,MySqlService ]

})



export class SettingsComponent implements OnInit {

 // myData:MyData[];

  model = new Thresholds(); 
  setValues:setThreshold[]; // from data base shows set values for data base.
  mysensData:MyData[];
  mysensDataDownload:MyData[];
 // myDataIncliX:MyData[];
 // myDataIncliY:MyData[];

  constructor(
    private _MySqlService: MySqlService,
    private _route: ActivatedRoute, 
    private _router:Router 
    ) { }


  SetThreshold = false;
  Display_SetThreshold_data = false;

  

ngOnInit(): void {
		this._MySqlService.getThresholds()
			.subscribe(setValues => this.setValues=setValues);

}


refreshSetValues(): void{
    this._MySqlService.getThresholds()
      .subscribe(setValues => this.setValues=setValues);
}



onEdit(){
  this.SetThreshold = true;
  this.Display_SetThreshold_data= true;
}



onUpdate(){

this.SetThreshold = false;

  let formTemp_add=this.model.TemperatureValue_add;
  let formTemp_sub=this.model.TemperatureValue_sub;
  
  let formIncli_X_add=this.model.InclinationValue_X_add;
  let formIncli_X_sub=this.model.InclinationValue_X_sub;
  
  let formIncli_Y=this.model.InclinationValue_Y;

  console.log("from client set temp",formTemp_add,formTemp_sub);
  console.log("from client set incli",formIncli_X_add,formIncli_X_sub);
  console.log("from client set incli",formIncli_Y);

this._MySqlService.updateThresholds(formTemp_add,formTemp_sub,formIncli_X_add,formIncli_X_sub,formIncli_Y)
      .subscribe(Data => console.log(Data));

 // this._router.navigate(['/settings']);
this._MySqlService.getThresholds()
      .subscribe(setValues => this.setValues=setValues);

  }




onDisplayTables(){
// TO get all sensor data from DB.
this._MySqlService.DisplayData()
                  .subscribe(mysensData =>{ 
                    this.mysensData=mysensData;
                    //console.log(myDataTemp)
                  })
                }


onDownloadData(){

  var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: false 
  };
        var date= (new Date()).toJSON();
//        console.log(date);


    this._MySqlService.DownloadData()
                  .subscribe(mysensDataDownload =>{ 
                    this.mysensDataDownload=mysensDataDownload;
    
      new Angular2Csv(this.mysensDataDownload, 'SensorData_'+date, options);


                  })


                 }

}









/*

this._MySqlService.DisplayTemperatures()
                  .subscribe(myDataTemp =>{ 
                    this.myDataTemp=myDataTemp;
                    //console.log(myDataTemp)
                  })

// TO get data from DB with all Inclination values

this._MySqlService.DisplayInclinationX()
                  .subscribe(myDataIncliX =>{ 
                    this.myDataIncliX=myDataIncliX;
                   // console.log(myDataIncli)
                  })

this._MySqlService.DisplayInclinationY()
                  .subscribe(myDataIncliY =>{ 
                    this.myDataIncliY=myDataIncliY;
                   // console.log(myDataIncli)
                  })

*/



/*

You can delete  settingsEdit and Display Components!!!
onSubmit(event) { 

    this.submitted = true; 
    let formTemp=this.model.TemperatureValue;
    let formIncli=this.model.InclinationValue;

    console.log("TemperatureValue: "+formTemp);
    console.log("InclinationValue: "+formIncli);
    
    this._MySqlService.createThresholds(formTemp,formIncli)
      .subscribe(Data => console.log(Data));
  }

}*/