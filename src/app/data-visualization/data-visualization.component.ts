import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent  {

  macAddress:Array<String>=[
  "564","564","564","564","564","564"
  ];
  
  macIdTitle:String;


  onClick(event){

   console.log(event);
   var idAttr =event.srcElement.attributes[3];
   var targetid=String(idAttr.value);
   //var value=idAttr.nodeValue;
   //console.log(targetid);
   var split=targetid.split('/');;
   //console.log(split[2]);
   this.macIdTitle=split[2];
   //this.macIdTitle=targetid;
    }

}
