import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
  setValues:setThreshold[];
  myDataTemp:MyData[];
  myDataIncli:MyData[];

  constructor(
    private _MySqlService: MySqlService,
    private _route: ActivatedRoute, 
    private _router:Router 
    ) { }


  submitted = false;
  
ngOnInit(): void {

		this._MySqlService.getThresholds()
			.subscribe(setValues => this.setValues=setValues);

}

refreshSetValues(): void{

    this._MySqlService.getThresholds()
      .subscribe(setValues => this.setValues=setValues);
}


onEdit(){

  this.submitted = true;
}

onUpdate(){

this.submitted = false;
  let formTemp=this.model.TemperatureValue;
  let formIncli=this.model.InclinationValue;
  console.log(formTemp);
  console.log(formIncli);

this._MySqlService.updateThresholds(formTemp,formIncli)
      .subscribe(Data => console.log(Data));

 // this._router.navigate(['/settings']);
this._MySqlService.getThresholds()
      .subscribe(setValues => this.setValues=setValues);

this._MySqlService.setTemperatures(formTemp)
                  .subscribe(myDataTemp =>{ 
                    this.myDataTemp=myDataTemp;
                    //console.log(myDataTemp)
                  })

this._MySqlService.setInclination(formIncli)
                  .subscribe(myDataIncli =>{ 
                    this.myDataIncli=myDataIncli;
                   // console.log(myDataIncli)
                  })
  }
}


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