import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent  {

  macAddress:Array<String>=[
  "00-17-0D-00-00-30-3F-17", "00-17-0D-00-00-58-2F-F2", "00-17-0D-00-00-30-4D-94",
  "00-17-0D-00-00-30-3F-17", "00-17-0D-00-00-58-2F-F2", "00-17-0D-00-00-30-4D-94",
  "00-17-0D-00-00-30-3F-17", "00-17-0D-00-00-58-2F-F2", "00-17-0D-00-00-30-4D-94",
  "00-17-0D-00-00-30-3F-17", "00-17-0D-00-00-58-2F-F2", "00-17-0D-00-00-30-4D-94"
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
