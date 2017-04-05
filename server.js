//sudo netstat -lpn |grep:3000
//sudo kill -9 8047(PID)
var port=3000;
var express   =    require("express");
var mysql     =    require('mysql');
var logger = require('morgan');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'sairam',
    database : 'SMIP',
    debug    :  false
});




var app       =    express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/', require('./routes/index')); //added




function time(){
var now     = new Date(); 
 var epoch= Date.now();
 
 var year    = now.getFullYear();
 var month   = now.getMonth()+1;
 var day     = now.getDate(); 
 var hour    = now.getHours();
 var minute  = now.getMinutes();
 var second  = now.getSeconds(); 
 var millis  = now.getMilliseconds();

if(month.toString().length == 1) {
 month = '0'+month;
 }
 if(day.toString().length == 1) {
 day = '0'+day;
 }   
 if(hour.toString().length == 1) {
  hour = '0'+hour;
 }
 if(minute.toString().length == 1) {
  minute = '0'+minute;
 }
 if(second.toString().length == 1) {
  second = '0'+second;
 }
 //if(millis.toString().length == 1) {
 //var millis = '0'+millis;
 //}
return timestamp = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second; //+':'+millis;


};





app.get("/",function(req,res){
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT * from sensor_data_table",function(err,rows){
            console.log(rows);
            
            if(!err) {
                res.send(JSON.stringify(rows));
            }       
            connection.release();    
        
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
        //res.sendFile(__dirname+'/public/index.html');
});



app.get("/senor_data",function(req,res){

        console.log(this.mail_tempvalue);
        console.log(this.mail_inclivalue);
        
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT * from sensor_data_table ",function(err,rese){
            //console.log(rese);
            
            if(!err) {
                res.send(JSON.stringify(rese));

            }       
            connection.release();    
        
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
        //res.sendFile(__dirname+'/public/index.html');

});




app.get("/setting",function(req,res){

        console.log("from get");

        var condition={id_value:"1"};
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query('select * from threshold_table WHERE ?', condition,function(err,rows){
        console.log(rows);
            
            if(err) {
                res.json(err);
            }       
            else{
              //res.json({"error": false});
              res.json(rows);
            }
            connection.release();    
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     });
  });
        res.setHeader('Content-Type', 'text/plain');
        //res.end('Something broke');
        //res.sendFile(__dirname+'/public/index.html');
});


app.put("/setting/edit",function(req,res){

        //console.log("1 from put");

        this.mail_settime= time();
        this.mail_tempvalue=req.body.tempValue;
        this.mail_inclivalue=req.body.incliValue;

         //console.log("2 from mail_settime",this.mail_settime);
         //console.log("3 from mail_tempvalue",this.mail_tempvalue);
         //console.log("4 from mail_inclivalue",this.mail_inclivalue);


        var settime= time();
        var tempvalue=req.body.tempValue;
        var inclivalue=req.body.incliValue;
        var condition={id_value:"1"};

        var tempValue= ''+ tempvalue +'' ;
        var incliValue= ''+ inclivalue + '' ;
        
        //var tempValue=tempvalue;
        //var incliValue=inclivalue;

        //console.log("5 from put tempvalue",tempValue);
        //console.log("6 from put inclivalue",incliValue);


        var createThreshold={
        id_value:1,
        temperature_value:tempValue,
        inclination_value:incliValue,
        date_time: settime

      }

        //console.log("7 showing created threshold",createThreshold);

        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        //console.log('8 connected as id ' + connection.threadId);
        
        connection.query('UPDATE threshold_table set ? WHERE ?', [createThreshold,condition],function(err,rows){
        //console.log(rows);
            
            if(err) {
                res.json(err);
            }       
            else{
              //res.json({"error": false});
              //console.log("9 from else showing rows");
              res.json(rows);
            }
            connection.release();    
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     });
  });
        //res.end('Something broke');
        //res.sendFile(__dirname+'/public/index.html');


        res.setHeader('Content-Type', 'text/plain');
  

});




app.post("/setting",function(req,res){
//this reuest is not implemented with angular only 'put' method is used to update the data
        console.log("from post");
        

        
        var settime= time();
        var tempvalue=req.body.tempValue;
        var inclivalue=req.body.incliValue;

        //var tempValue= '"' + tempvalue + '"' ;
        //var incliValue= '"' + inclivalue + '"' ;

        var tempValue=tempvalue;
        var incliValue=inclivalue;

        console.log(tempValue);
        console.log(incliValue);


        var createThreshold={
        id_value:1,
        temperature_value:tempValue,
        inclination_value:incliValue,
        date_time: settime

      }
        console.log(createThreshold);

        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query('INSERT INTO threshold_table set ?',createThreshold ,function(err,rows){
        console.log(rows);
            
            if(err) {
                res.json(err);
            }       
            else{
              //res.json({"error": false});
              res.json(rows);
            }
            connection.release();    
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     });
  });
        res.setHeader('Content-Type', 'text/plain');
        //res.end('Something broke');
        //res.sendFile(__dirname+'/public/index.html');
});




                    ///////////for sending mail///////////////////







//runs every minute 10th second
var job = schedule.scheduleJob('10 * * * * *', getSetThresholds);


//getThresholds will query data base for the current values of thresholds.
function getSetThresholds() {

pool.getConnection(function(err,connection){
        
        var condition={id:"1"};
        
        console.log('connected as id ' + connection.threadId);
        
        connection.query('SELECT * FROM notify_email_table WHERE ?',condition,function(err,rows){

        console.log("log as :",rows[0]);
        //console.log(rows[0].temperature_value);
        //console.log(rows[0].inclination_value);
        

        var mail_notify_temp_value;
        var mail_notify_temp_length;
        var mail_notify_reachedtime_temp;
        var mail_notify_incli_value;
        var mail_notify_incli_length;
        var mail_notify_reachedtime_incli;
        var mail_notify_setThreshold_time;

            if(err) {
                JSON.stringify(err);
            }       
            else{
              //res.json({"error": false});
              mail_notify_temp_value=rows[0].notify_temp_value;
              mail_notify_temp_length=rows[0].notify_temp_length;
              mail_notify_reachedtime_temp=rows[0].notify_reachedtime_temp;
              mail_notify_incli_value=rows[0].notify_incli_value;
              mail_notify_incli_length=rows[0].notify_incli_length;
              mail_notify_reachedtime_incli=rows[0].notify_reachedtime_incli;
              mail_notify_setThreshold_time=rows[0].notify_setThreshold_time;

             
                 }
            connection.release();    

        if(mail_notify_temp_length==0 && mail_notify_incli_length==0){

          console.log("no mail");
          console.log(mail_notify_temp_length==0 && mail_notify_incli_length==0);

        }
        else{
          sendMail(mail_notify_temp_value,
                 mail_notify_temp_length,
                 mail_notify_reachedtime_temp,
                 mail_notify_incli_value,
                 mail_notify_incli_length,
                 mail_notify_reachedtime_incli,
                 mail_notify_setThreshold_time)
        }
        

                                  //getCriteria holds the logic for filtering the sensor_data with thresholds

        //getCriteria(mail_settime,mail_tempvalue,mail_inclivalue)
        //getCriteriaTemp(mail_tempvalue)


        });

        
  });


                //**********function to setup mail payload via sendgrid*************//


function sendMail(mail_notify_temp_value,
                  mail_notify_temp_length,
                  mail_notify_reachedtime_temp,
                  mail_notify_incli_value,
                  mail_notify_incli_length,
                  mail_notify_reachedtime_incli,
                  mail_notify_setThreshold_time) {

        
var send_mail = require('sendgrid').mail;
from_email = new send_mail.Email("astrose.enas@gmail.com");
to_email = new send_mail.Email("sairamaaaa@gmail.com");

subject = "Astrose Notifications";

content = new send_mail.Content("text/html", 
          "<h1 align='center'><font color='#008b46'> ASTROSE Wirless Sensor Network </font></h1>"+"<br>"+
          "<h2 align='center'><font color='#008b46'>Threshold Limits Fulfilled</font></h2>"+"<br>"
          
          +"<h3 align='center' >Set Temperature : "+" "+ "<font color='#e02e00'>"+mail_notify_temp_value+"°C </font>"+" "+
          "fulfilled with"+" " +"<font color='#e02e00'>"+mail_notify_temp_length+ "</font>"+" notifications "+" " 
          + mail_notify_reachedtime_temp+"<br>"+

          "Set Inclination  :"+" "+" <font color='#e02e00'>"+mail_notify_incli_value +"</font>"+" "+
        "fulfilled with"+" "+"<font color='#e02e00'>" +mail_notify_incli_length+"</font>"+
        " notifications "+" " + mail_notify_reachedtime_incli+"<br>"+
         
          "Set Threshold Time: "+" "+" <font color='#e02e00'>"+mail_notify_setThreshold_time+"</font>"+" "+"<br>"
          +"</h3>");

mail = new send_mail.Mail(from_email, subject, to_email, content);

var _sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

        

var request = _sendgrid.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

      _sendgrid.API(request, function(error, response) {
      //console.log("sg1",response.statusCode);
      //console.log("sg2",response.body);
      //console.log("sg3",response.headers);
      })
      console.log('The answer to life, the universe, and everything!',mail_notify_temp_value,mail_notify_incli_value);
}




}



function redirectRouter(req,res){
  res.sendFile(__dirname+'/dist/index.html');
}

app.use(redirectRouter);



app.listen(port);

console.log('Listening on localhost port '+port);


module.exports = app;//added


//USE SMIP;
//select * from Temperature_table WHERE mac='3s-ds-23-sf-23-ce-32';

//WHERE mac='3s-ds-23-sf-23-ce-32'

//INSERT INTO threshold_table(id_value,temperature_value,inclination_value,date_time) VALUES ("1", "23", "34","2017-02-02 22:04:05");

/*
                                //getCriteria holds the logic for filtering the sensor_data with thresholds


//function getCriteria(mail_settime,mail_tempvalue,mail_inclivalue){
function getCriteriaTemp(mail_tempvalue){
            console.log("in getCriteriaTemp");

        var Temp = mail_tempvalue;

 pool.getConnection(function(err,connection){
        
        var condition1=mail_tempvalue;
        var condition2=mail_tempvalue+1;
        //console.log('condition1',condition1);
        //console.log('condition2',condition2);
         //let a =parseFloat(condition1)
        //console.log('connected as id ' + connection.threadId);
       var queryString='SELECT * FROM sensor_data_table WHERE temperature_data >= ? and temperature_data <= ?';
       connection.query(queryString,[condition1,condition2],function(err,rows){

         //console.log("log as :",rows);      
        var Temp_notif = rows.length;
        console.log("start 1: ",Temp_notif);

         if(err) {
                 console.log(JSON.stringify(err));
            }

            else {
         
               console.log("start 2: ",Temp_notif);
               return Temp_notif;
            }


          connection.release();  

           });

  });

console.log("end 1:",Temp);
return console.log("end 2:",Temp);

}
*/