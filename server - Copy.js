//sudo netstat -lpn |grep:3000
//sudo kill -9 8047(PID)
var port = 3000;
var express = require("express");
var mysql = require('mysql');
var logger = require('morgan');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var _ = require('lodash');

var diff = require('deep-diff').diff;
var observableDiff = require('deep-diff').observableDiff,
  applyChange = require('deep-diff').applyChange;

var pool = mysql.createPool({
  connectionLimit: 100, //important
  host: 'localhost',
  user: 'root',
  password: 'sairam',
  database: 'astrose_smart_meship',
  debug: false
});



var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/', require('./routes/index')); //added




function time() {
  var now = new Date();
  var epoch = Date.now();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var millis = now.getMilliseconds();

  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  //if(millis.toString().length == 1) {
  //var millis = '0'+millis;
  //}
  return timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second; //+':'+millis;


};





app.get("/", function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("SELECT * from sensor_data_table", function(err, rows) {
      console.log(rows);

      if (!err) {
        res.send(JSON.stringify(rows));
      }
      connection.release();

    });

    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  //res.sendFile(__dirname+'/public/index.html');
});



app.get("/senor_data", function(req, res) {

  console.log(this.mail_tempvalue);
  // console.log(this.mail_inclivalue_X);
  //console.log(this.mail_inclivalue_Y);

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("SELECT * from sensor_data_table ", function(err, rese) {
      console.log(rese);

      if (!err) {
        res.send(JSON.stringify(rese));

      }
      connection.release();

    });

    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  //res.sendFile(__dirname+'/public/index.html');

});


app.get("/config", function(req, res) {

  console.log("from get config");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('select * from configs_mean_table ', function(err, rows) {
      //console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});

app.get("/download_data", function(req, res) {

  console.log("from get download_data");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    //var download_query = 'SET @export_file= CONCAT( "SELECT * FROM Astrose_smart_meshIP.sensor_data_table INTO OUTFILE '/var/lib/mysql-files/sensorData_",date_format(now(),'%d-%m-%y %h:%i:%s'),".csv'");PREPARE snapshot from @export_file;EXECUTE snapshot;'

    connection.query(download_query, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        console.log("downloaded to: /var/lib/mysql-files/");
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});



app.get("/setting", function(req, res) {
  // method  used to get threshold values from the database with condition id=1
  console.log("from get setting");

  var condition = { id_value: "1" };
  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('select * from threshold_table WHERE ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});


app.put("/setting/edit", function(req, res) {
  // endpoint to update or edit the threshold values
  console.log("1 from put");

  this.mail_settime = time();

  // check app.service.ts 148 for data properties in assigning variables to update threshold values to database

  this.mail_tempvalue_add = req.body.tempValue_add;
  this.mail_tempvalue_sub = req.body.tempValue_sub;

  this.mail_inclivaluex_add = req.body.incliValue_X_add;
  this.mail_inclivaluex_sub = req.body.incliValue_X_sub;

  //this.mail_inclivaluey=req.body.incliValue_Y;

  //console.log("2 from mail_settime",this.mail_settime);
  //console.log("3 from mail_tempvalue",this.mail_tempvalue);
  //console.log("4 from mail_inclivalue",this.mail_inclivalue);


  var settime = time();

  var tempvalue_add = req.body.tempValue_add;
  var tempvalue_sub = req.body.tempValue_sub;

  var inclivalue_xadd = req.body.incliValuex_add;
  var inclivalue_xsub = req.body.incliValuex_sub;

  //var inclivalue_y=req.body.incliValuey;


  /// creating payload for updating data into mysql 

  var condition = { id_value: "1" };

  var _tempValueadd = '' + tempvalue_add + '';
  var _tempValuesub = '' + tempvalue_sub + '';

  var _incliValueXadd = '' + inclivalue_xadd + '';
  var _incliValueXsub = '' + inclivalue_xsub + '';

  //var _incliValueY= ''+ inclivalue_y + '' ;

  //var tempValue=tempvalue;
  //var incliValue=inclivalue;

  //console.log("5 from put tempvalue",tempValue);
  //console.log("6 from put inclivalue",incliValue);


  var updateThreshold = {

    id_value: 1,

    temperature1_value_add: _tempValueadd,
    temperature1_value_sub: _tempValuesub,

    inclination_value_X_add: _incliValueXadd,
    inclination_value_X_sub: _incliValueXsub,

    //inclination_value_Y:_incliValueY,

    date_time: settime

  }

  console.log("7 showing updated threshold", updateThreshold);

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    //console.log('8 connected as id ' + connection.threadId);

    connection.query('UPDATE threshold_table set ? WHERE ?', [updateThreshold, condition], function(err, rows) {
      //console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        //console.log("9 from else showing rows");
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');


  res.setHeader('Content-Type', 'text/plain');


});




//this request is not implemented with angular only 'put' method is used to post the data
app.post("/setting", function(req, res) {
  console.log("from post");



  var settime = time();
  var tempvalue = req.body.tempValue;
  var inclivalue = req.body.incliValue;

  //var tempValue= '"' + tempvalue + '"' ;
  //var incliValue= '"' + inclivalue + '"' ;

  var tempValue = tempvalue;
  var incliValue = inclivalue;

  console.log(tempValue);
  console.log(incliValue);


  var createThreshold = {
    id_value: 1,
    temperature1_value: tempValue,
    inclination_value_X: incliValue,
    date_time: settime

  }
  console.log(createThreshold);

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('INSERT INTO threshold_table set ?', createThreshold, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});




// health report data


app.get("/health_report_table", function(req, res) {

  console.log("from get health_report_table");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM health_report_table ', function(err, rows) {
      //console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});





app.get("/energy", function(req, res) {

  console.log("from get voltage");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }
    var condition = "null";
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT hr_macid,hr_mote_id,hr_timeStamp,hr_epochStamp,hr_batt_voltage FROM health_report_table where hr_batt_voltage != ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});

app.get("/avg_rssi", function(req, res) {

  console.log("from get avg_rssi");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }
    var condition = "null";

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT hr_macid,hr_mote_id,hr_timeStamp,hr_epochStamp,hr_avg_rssi FROM health_report_table where hr_avg_rssi != ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});

app.get("/packet_loss", function(req, res) {

  console.log("from get voltage");

  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    }
    var condition = "null";

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT hr_macid,hr_mote_id,hr_timeStamp,hr_epochStamp,hr_packetloss \
          FROM health_report_table where hr_packetloss != ?', condition, function(err, rows) {
      console.log(rows);

      if (err) {
        res.json(err);
      } else {
        //res.json({"error": false});
        res.json(rows);
      }
      connection.release();
    });
    connection.on('error', function(err) {
      res.json({ "code": 100, "status": "Error in connection database" });
      return;
    });
  });
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Something broke');
  //res.sendFile(__dirname+'/public/index.html');
});



///////////for sending mail using nodemailer///////////////////


//runs every minute 35th second
var rule = new schedule.RecurrenceRule();
//rule.minute = 40;
rule.second = [00, 20, 40];

var job = schedule.scheduleJob(rule, getSetThresholds);

//getThresholds will query data base for the current values of thresholds.
function getSetThresholds() {

  pool.getConnection(function(err, connection) {


    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT TempUpLimit_a1,TempLowLimit_a2,IncliUpLimit_a3,IncliLowLimit_a4,\
                          TempUpLimit_b1,TempLowLimit_b2,IncliUpLimit_b3,IncliLowLimit_b4,\
                          TempUpLimit_c1,TempLowLimit_c2,IncliUpLimit_c3,IncliLowLimit_c4,\
                          TempUpLimit_d1,TempLowLimit_d2,IncliUpLimit_d3,IncliLowLimit_d4 \
                          FROM nodemailer_table', function(err, rows) {
      console.log("from nodemailer_table");
      //console.log("log as :",rows);
      console.log("length :", rows.length);

      _Last = rows.length - 1;
      _Previous = _Last - 1;
      _First = 0;
      count = 0;
      var l = rows[_Last];
      var f = rows[_First];
      var p = rows[_Previous];
      var LastEqualPrevious = true;

      //console.log("last", _Last, rows[_Last]);
      //console.log("_Previous", _Previous, rows[_Previous]);
      //console.log("first",_First,rows[_First]);

      //console.log("_Last", _Last);
      //console.log("_Previous", _Previous);
      //console.log("_First", _First);
      //console.log("check", _.isEqual(rows[_Last], rows[_Previous]));


      // arrays for adding the diff data from database :spliting strings
      var payload = [];
      var TempUpLimit = [];
      var TempLowLimit = [];
      var IncliUpLimit = [];
      var IncliLowLimit = [];
      //console.log('l',l);
      //console.log('p',p);


      var differences = diff(rows[_Last], rows[_Previous]);
      console.log(differences);
      if (differences != undefined) {
        var dif = JSON.stringify(differences);
        var differ = JSON.parse(dif);

        //console.log(dif);

        //console.log(differ);

        //list.push(item.path[0],item.lhs);// givis array of values

        _.each(differ, function(item) {
          payload.push(_.pick(item, 'path', 'lhs'));
        });
        console.log("payload", payload);

        _.each(payload, function(item) {

          var path = item.path[0]

          var temp_up_limit = new RegExp(/\bTempUpLimit\w\w\w/i);
          var temp_low_limit = new RegExp(/\bTempLowLimit\w\w\w/i);
          var incli_up_limit = new RegExp(/\bIncliUpLimit\w\w\w/i);
          var incli_low_limit = new RegExp(/\bIncliLowLimit\w\w\w/i);

          if (temp_up_limit.test(path)) {
            TempUpLimit.push(item.lhs)
          } else if (temp_low_limit.test(path)) {
            TempLowLimit.push(item.lhs)
          } else if (incli_up_limit.test(path)) {
            IncliUpLimit.push(item.lhs)
          } else if (incli_low_limit.test(path)) {
            IncliLowLimit.push(item.lhs)
          }
        });

        console.log('imhere0')
      }

      // checking or null values in last index
      var vals = Object.keys(l).map(function(key) {
        return l[key];
      });
      //console.log(vals)
      for (i = 0; i < vals.length; i++) {
        if (vals[i] == null) {
          count++
          //console.log(count)
        }
      }

      if (err) {
        JSON.stringify(err);
      } else if (LastEqualPrevious == _.isEqual(rows[_Last], rows[_Previous])) {
        //only valid when it is true;
        console.log("Data is equal: No mail");
      } else if (count == 16) {
        console.log("Null data: No mail:", count);
      } else {
        console.log("youth");

        console.log(TempUpLimit, TempLowLimit, IncliUpLimit, IncliLowLimit);

        sendMail(TempUpLimit, TempLowLimit, IncliUpLimit, IncliLowLimit);

      }

      connection.release();

    });
  });

}
//**********function to setup mail payload via nodemailer*************//



function sendMail(TUL, TLL, IUL, ILL) {

  var TUL_len = TUL.length
  var TLL_len = TLL.length
  var IUL_len = IUL.length
  var ILL_len = ILL.length

  var mailer = require("nodemailer");
  var Transport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "astrose.enas@gmail.com",
      pass: "sairamaaaa4"
    }
  });


  subject = "Astrose Notifications";

  content =
    "<h1 align='center'><font color='#008b46'> ASTROSE Wirless Sensor Network </font></h1>" + "<br>" +
    "<h2 align='center'><font color='#008b46'>Threshold Limits Fulfilled</font></h2>" + "<br>"

    +
    "<h3 align='left' >Temperature Upper Limit:" + " " + "</h3>" + TUL +
    "<br>" +
    "<h3 align='left' >Temperature Lower Limit:" + " " + "</h3>" + TLL +
    "<br>" +
    "<h3 align='left' >Inclination [X] Upper Limit:" + " " + "</h3>" + IUL +
    "<br>" +
    "<h3 align='left' >Inclination [X] Lower Limit:" + " " + "</h3>" + ILL +
    "<br>"

  //console.log(content);

  var mail = {
    from: "astrose.enas@gmail.com",
    to: "sairamaaaa@gmail.com",
    subject: subject,
    text: "Astrose Notifications",
    html: content
  }

  Transport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: ");
    }

    Transport.close();
  });

  console.log('The answer to life, the universe, and everything!', mail);
}




function redirectRouter(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
}

app.use(redirectRouter);



app.listen(port);

console.log('Listening on localhost port ' + port);


module.exports = app; //added
