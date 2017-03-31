import { Injectable }    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {MyData} from './StructData';
import { MySQLTable } from './MySqlTable';
import {Thresholds} from './Threshold';
import {setThreshold} from './setThresholds';



@Injectable()
export class MySqlService {
public  filteredMac;


  private headers = new Headers({'Content-Type': 'application/json'});
  private _Url = 'http://localhost:3000';  // URL to web api

  constructor(
    private _http: Http,
    private route: ActivatedRoute, 
    private router:Router ) 
  {   
    this.route.params.subscribe((params: Params)=>{
    let filterMac = params['id'];
    //console.log("at get temp: "+ filterMac);
    this.filteredMac=String(filterMac);
    })
       }

getTable(): Observable<MySQLTable[]> {
  	const url = this._Url+'/senor_data';
    return this._http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
               }



getTemperatures(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    //console.log("mac at temps "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                console.log(data);
                let parsedData = [];
                console.log("mac at temps again "+ filtered);
                data.filter(function(el){ return el.mac_id== filtered })
                .forEach(function(item){ parsedData.push({ 
                          x:item.epoch_time_stamp, y:parseFloat(item.temperature_data) });  });
                          //console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  



getInclination(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    console.log("mac at incli "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                let parsedData = []; 
               // let f=this.filteredMac;
                data.filter(function(el){ return el.mac_id==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.epoch_time_stamp, y:parseFloat(item.inclination_data) });  });
                         // console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }   



getTemperatureInclination(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';      //should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    console.log("mac at both "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                let parsedData = []; 
                //let f=this.filteredMac;
                data.filter(function(el){ return el.mac_id==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.epoch_time_stamp, y:parseFloat(item.temperature_data) });  });
                         // console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  

  





                        ///Handlers for Thresholds///



createThresholds(formTemp:string,formIncli:string): Observable<Thresholds[]> {
    const url = this._Url+'/setting';              // should change here
    console.log(url);
    var formData={
      tempValue:formTemp,
      incliValue:formIncli
    }
    console.log(formData);

     return this._http.post(url,JSON.stringify(formData),{ headers: this.headers })
                .map(res =>res.json())
                .catch(this.handleError);
                }


updateThresholds(formTemp:string,formIncli:string): Observable<Thresholds[]> {
    const url = this._Url+'/setting'+'/edit';              // should change here
    console.log(url);

    var formData={
      tempValue:formTemp,
      incliValue:formIncli
    }
    console.log("from service",formData);

     return this._http.put(url,JSON.stringify(formData),{ headers: this.headers })
                .map(res =>res.json())
                .catch(this.handleError);
                }




getThresholds():Observable<setThreshold[]>{
  const url = this._Url+'/setting'; 
  console.log(url);
  return this._http.get(url)
             .map(res =>res.json())
             .catch(this.handleError);
                
}






                      //////getting thresholds and filtering/////////////



setTemperatures(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=parseFloat(filter);
    //console.log("mac at temps "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                console.log(data);
                let parsedData = [];
                console.log("setvalue at temps again "+ filtered);
               data.filter(function(el){ return el.temperature_data >=filtered})
                .forEach(function(item){ parsedData.push(item);  });
                          console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  


setInclination(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=parseFloat(filter);
    //console.log("mac at temps "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                console.log(data);
                let parsedData = [];
                console.log("setvalue at temps again "+ filtered);
               data.filter(function(el){ return el.inclination_data >=filtered})
                .forEach(function(item){ parsedData.push(item);  });
                          console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  




private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }


}





//

//getTemperatures(id: String): Observable<MyData[]> {
//    const url = this._Url+'/temperature';              // should change here
//    //console.log(url);
//    let filter= `${id}`;
//    let filtered=String(filter);
//    //console.log("mac at temps "+ filtered);
//    return this._http.get(url)
//               .map(res =>{
//                let data=res.json();
//                //console.log(data);
//                //let parsedData = [];
//                console.log("mac at temps again "+ filtered);
//                data.filter(function(el){ return el.mac_id== filtered })
//                //console.log("filetrredddd: ",data);
//                return data; })
//               .catch(this.handleError);
//               }  
















           //    <app-temperature-component></app-temperature-component>
             //   <app-inclination-component></app-inclination-component>
    //           


//private extractData(res: Response){
//  let body =res.json();//console.log(body);
//  body.filter(function(da){ return da.mac=="3s-ds-23-sf-25-ce-35";
//  }).map(function(data)
//  { return { X:data.epoch_time_stamp, Y:parseFloat(data.temp)};
//  });//

//}





//temp:parseFloat(item.temperature_data),


////for selec ting a specif mac
//private extractData(res: Response){
//  let body =res.json();
//  console.log(body);
//  return body.filter(function(macs){
//  return (macs.mac=="3s-ds-23-sf-23-ce-32");
//  }) || { };


//.function(macs){
//    xTime=macs.epoch_time_stamp;
//    yTemp=macs.temp;
//    console.log(xTime);
//  return {Xtime: xTime ,Ytemp:yTemp } ; 
//} 








//data2.forEach((el) => { data.push({time:el.time, temp:el.temp}) });











//private extractData(res: Response){
//  let body =res.json();//console.log(body);
//  var parsedData=[];
//  var xTime; var yTemp;
// return body.filter(function(macs){
//     return (macs.mac=="3s-ds-23-sf-25-ce-35")  ;
//  
//  })
//}


