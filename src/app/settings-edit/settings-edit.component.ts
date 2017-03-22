import { Component, OnInit } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { MySqlService } from '../app.service';
import {MyData} from '../StructData';
import {Thresholds} from '../Threshold';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.css']
})




export class SettingsEditComponent implements OnInit {


    model = new Thresholds();
    data:Thresholds[];
	  submitted = false;
     myData:MyData[];

   constructor(
    private _MySqlService: MySqlService,
    private _route: ActivatedRoute, 
    private _router:Router 
    ) { }

  

onUpdate(){

  this.submitted = false;
  let formTemp=this.model.TemperatureValue;
  let formIncli=this.model.InclinationValue;
  console.log(formTemp);
  console.log(formIncli);

  this._MySqlService.updateThresholds(formTemp,formIncli)
      .subscribe(Data => console.log(Data));

  this._router.navigate(['/settings']);


this._MySqlService.setTemperatures(formTemp)
                  .subscribe(myData =>{ 
                    this.myData=myData;
                    console.log(myData)
                   
                  })

  }







ngOnInit() {



  }






// TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }



}






