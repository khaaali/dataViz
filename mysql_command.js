///***********create table for threshold_table*********************

CREATE table threshold_table(
id_value INT(11) NOT NULL primary key 
temperature_value float NOT NULL
inclination_value float NOT NULL
date_time DATETIME NOT NULL //shuould also be unique


INSERT INTO threshold_table(id_value,temperature_value,inclination_value,date_time) 
VALUES ("1", "23", "34","2017-02-02 22:04:05");


SELECT * from threshold_table WHERE id_value=1


///***************** create table for sensor_data_table*****************

CREATE table sensor_data_table(
task_id INT(11) NOT NULL primary key AUTO_INCREMENT, 
mac_id varchar(45) NOT NULL 
temperature_data varchar(45) NOT NULL,
inclination_data varchar(45) NOT NULL,
time_stamp DATETIME NOT NULL 
epoch_time_stamp BIGINT(16) NOT NULL // should also be primary and also unique
);


SELECT * from sensor_data_table WHERE temperature_data >= 2 and temperature_data <=3;



/// deletion of tables and Data base

truncate table threshold_table;

CREATE DATABASE IF NOT EXISTS SMIP;
SHOW DATABASES;
DROP DATABASE IF EXISTS SMIP;


/// Mysql handling events 

SHOW PROCESSLIST

SET GLOBAL event_scheduler='ON'

SHOW EVENTS FROM SMIP;

/// to destroy event
DROP EVENT event_01;



/// joining commands

SELECT mac_id,temperature_data,inclination_data,time_stamp,epoch_time_stamp,temperature_value,
date_time
FROM sensor_data_table T1
INNER JOIN threshold_table T2 ON T1.temperature_data >= T2.temperature_value
AND T1.temperature_data <=T2.temperature_value+1;


/// for counting number of rows

SHOW count(*) table






///******* for creating table filter_temperature_table (ftemp:filter temperature)**************


CREATE TABLE `SMIP`.`filter_temperature_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `mac_id_ftemp` VARCHAR(45) NULL,
  `ftemperature_data` VARCHAR(45) NULL,
  `time_stamp_ftemp` VARCHAR(45) NULL,
  `epoch_time_stamp_ftemp` VARCHAR(45) NULL,
  `ftemp_value` FLOAT NULL,
  `set_time_value_ftemp` DATETIME NULL);


///**********creating event for filtering tempertaure and adding data into tables***********

delimiter |

CREATE EVENT filter_temperature_event_01
ON SCHEDULE EVERY 1 minute
DO
	BEGIN
	 TRUNCATE TABLE SMIP.filter_temperature_table;
	   INSERT INTO filter_temperature_table
        (mac_id_ftemp,ftemperature_data,time_stamp_ftemp,
		epoch_time_stamp_ftemp,ftemp_value,set_time_value_ftemp)
		SELECT
             mac_id,temperature_data,time_stamp,epoch_time_stamp,temperature_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.temperature_data >= threshold_table.temperature_value
	       AND sensor_data_table.temperature_data <=threshold_table.temperature_value+1);
  END |
  
delimiter ;  






///***********for creating table filter_inclination_table (fincli:filter inclination)*************

CREATE TABLE `SMIP`.`filter_inclination_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `mac_id_fincli` VARCHAR(45) NULL,
  `finclination_data` VARCHAR(45) NULL,
  `time_stamp_fincli` VARCHAR(45) NULL,
  `epoch_time_stamp_fincli` VARCHAR(45) NULL,
  `fincli_value` FLOAT NULL,
  `set_time_value_fincli` DATETIME NULL);
   

///**********creating event for filtering inclination and adding data into tables***********

   delimiter |

CREATE EVENT filter_inclination_event_02
ON SCHEDULE EVERY 1 minute
DO
	BEGIN
	 TRUNCATE TABLE SMIP.filter_inclination_table;
	   INSERT INTO filter_inclination_table
        (mac_id_fincli,finclination_data,time_stamp_fincli,
		epoch_time_stamp_fincli,fincli_value,set_time_value_fincli)
		SELECT
             mac_id,inclination_data,time_stamp,epoch_time_stamp,inclination_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.inclination_data >= threshold_table.inclination_value
	       AND sensor_data_table.inclination_data <=threshold_table.inclination_value+1);
  END |
  
delimiter ;  


?????????*****************CREATING SINGLE EVENT TO UPDATE TEMPERATURE AND INCLINATION TABLES***************************????????????????

SET GLOBAL event_scheduler='ON'
delimiter |
CREATE EVENT filter_event_temperature_inclination_00
ON SCHEDULE EVERY 1 minute
DO
  BEGIN
	 TRUNCATE TABLE SMIP.filter_temperature_table;
	 INSERT INTO filter_temperature_table
        (mac_id_ftemp,ftemperature_data,time_stamp_ftemp,
		epoch_time_stamp_ftemp,ftemp_value,set_time_value_ftemp)
		SELECT
             mac_id,temperature_data,time_stamp,epoch_time_stamp,temperature_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.temperature_data >= threshold_table.temperature_value
	       AND sensor_data_table.temperature_data <=threshold_table.temperature_value+1);
           
     TRUNCATE TABLE SMIP.filter_inclination_table;
	 INSERT INTO filter_inclination_table
        (mac_id_fincli,finclination_data,time_stamp_fincli,
		epoch_time_stamp_fincli,fincli_value,set_time_value_fincli)
		SELECT
             mac_id,inclination_data,time_stamp,epoch_time_stamp,inclination_value,date_time
	    FROM sensor_data_table,threshold_table
	         WHERE 
           (sensor_data_table.inclination_data >= threshold_table.inclination_value
	       AND sensor_data_table.inclination_data <=threshold_table.inclination_value+1); 



	UPDATE SMIP.notify_email_table
	SET  notify_email_table.notify_temp_value=(SELECT max(ftemp_value) from filter_temperature_table),
    	 notify_email_table.notify_temp_length=(SELECT COUNT(ftemperature_data) from filter_temperature_table),
     	 notify_email_table.notify_reachedtime_temp=(SELECT max(time_stamp_ftemp) from filter_temperature_table),
     	 notify_email_table.notify_incli_value=(SELECT max(fincli_value) from filter_inclination_table),
    	 notify_email_table.notify_incli_length=(SELECT COUNT(finclination_data) from filter_inclination_table),
     	 notify_email_table.notify_reachedtime_incli=(SELECT max(time_stamp_fincli) from filter_inclination_table),
	 	 notify_email_table.notify_setThreshold_time=(SELECT date_time from threshold_table)
	Where notify_email_table.id="1"; 
           
  END |
  
delimiter ;  





???????**********************************************************************************???????????????????????




///************************** for creating table notify_email_table******************************

CREATE TABLE `SMIP`.`notify_email_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY , 
  `notify_temp_value` FLOAT NULL,
  `notify_temp_length` INT(11) NULL,
  `notify_reachedtime_temp` DATETIME NULL,
  `repeat_flag`  VARCHAR(11) NOT NULL ,
  `notify_incli_value` FLOAT NULL,
  `notify_incli_length` INT(11) NULL,
  `notify_reachedtime_incli` DATETIME NULL);



///**************creating  notify_email_table and adding data into tables******************************

This is important step to do after creating table 
fill table with values and use update script below using event scheduler 


INSERT INTO notify_email_table
       (notify_temp_length,notify_temp_value,notify_reachedtime_temp,
       notify_incli_value,notify_incli_length,notify_reachedtime_incli)
SELECT * FROM 
  (SELECT COUNT(ftemperature_data),max(ftemp_value),
	min(time_stamp_ftemp) FROM filter_temperature_table ) as temps1, 
  (SELECT COUNT(finclination_data),max(fincli_value),
	min(time_stamp_fincli)FROM filter_inclination_table) as temps4;  
		




///***************to update the notify_email_table regularly*************************************




UPDATE SMIP.notify_email_table

SET  notify_email_table.notify_temp_value=(SELECT max(ftemp_value) from filter_temperature_table),
     notify_email_table.notify_temp_length=(SELECT COUNT(ftemperature_data) from filter_temperature_table),
     notify_email_table.notify_reachedtime_temp=(SELECT max(time_stamp_ftemp) from filter_temperature_table),
     notify_email_table.notify_incli_value=(SELECT max(fincli_value) from filter_inclination_table),
     notify_email_table.notify_incli_length=(SELECT COUNT(finclination_data) from filter_inclination_table),
     notify_email_table.notify_reachedtime_incli=(SELECT max(time_stamp_fincli) from filter_inclination_table),
	 notify_email_table.notify_setThreshold_time=(SELECT date_time from threshold_table)
Where notify_email_table.id="1";



UPDATE notify_email_table

SET  notify_email_table.send_mail_flag="True"
     
Where notify_email_table.id="1";









///****************Download mysql data as CSV Snapshot********************************* 

SET @export_file=
CONCAT(
	"SELECT * FROM SMIP.sensor_data_table INTO OUTFILE '/var/lib/mysql-files/snapshot_"
    ,date_format(now(),'%d-%m-%y %h:%i:%s')
    ,".csv'");

PREPARE snapshot from @export_file;
EXECUTE snapshot;
