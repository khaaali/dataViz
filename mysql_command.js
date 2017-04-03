/// for thresholds

CREATE table threshold_table(
id_value INT(11) NOT NULL primary key 
temperature_value float NOT NULL
inclination_value float NOT NULL
date_time DATETIME NOT NULL //shuould also be unique

INSERT INTO threshold_table(id_value,temperature_value,inclination_value,date_time) 
VALUES ("1", "23", "34","2017-02-02 22:04:05");


SELECT * from threshold_table WHERE id_value=1


/// for sensor data table

CREATE table sensor_data_table(
task_id INT(11) NOT NULL primary key AUTO_INCREMENT, 
mac_id varchar(45) NOT NULL 
temperature_data varchar(45) NOT NULL,
inclination_data varchar(45) NOT NULL,
time_stamp DATETIME NOT NULL 
epoch_time_stamp BIGINT(16) NOT NULL // should be primary and also unique
);


SELECT * from sensor_data_table WHERE temperature_data >= 2 and temperature_data <=3;



/// deletion of tables and Data base

tuncate table threshold_table;

CREATE DATABASE IF NOT EXISTS SMIP;
SHOW DATABASES;
DROP DATABASE IF EXISTS SMIP;


/// Mysql handling events 

SHOW PROCESSLIST
SET GLOBAL event_scheduler='ON'
SHOW EVENTS FROM SMIP;

/// to destroy event
DROP EVENT event_01;

CREATE EVENT event_01
ON SCHEDULE 
EVERY 1 minute_second
COMMENT 'event_01 created'
DO
SELECT mac_id,temperature_data,time_stamp,epoch_time_stamp,temperature_value,
date_time
FROM sensor_data_table T1
INNER JOIN threshold_table T2 ON T1.temperature_data >= T2.temperature_value
AND T1.temperature_data <=T2.temperature_value+1;





/// joining commands

SELECT mac_id,temperature_data,inclination_data,time_stamp,epoch_time_stamp,temperature_value,
date_time
FROM sensor_data_table T1
INNER JOIN threshold_table T2 ON T1.temperature_data >= T2.temperature_value
AND T1.temperature_data <=T2.temperature_value+1;


/// for counting number of rows









//////// for creating filter_temperature_table (ftemp:filter temperature)


CREATE TABLE `SMIP`.`filter_temperature_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `mac_id_ftemp` VARCHAR(45) NULL,
  `ftemperature_data` VARCHAR(45) NULL,
  `time_stamp_ftemp` VARCHAR(45) NULL,
  `epoch_time_stamp_ftemp` VARCHAR(45) NULL,
  `ftemp_value` FLOAT NULL,
  `set_time_value_ftemp` VARCHAR(45) NULL);


///creating event for filtering tempertaure and adding data into tables

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






//////// for creating filter_inclination_table (ftemp:filter inclination)

CREATE TABLE `SMIP`.`filter_inclination_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `mac_id_fincli` VARCHAR(45) NULL,
  `finclination_data` VARCHAR(45) NULL,
  `time_stamp_fincli` VARCHAR(45) NULL,
  `epoch_time_stamp_fincli` VARCHAR(45) NULL,
  `fincli_value` FLOAT NULL,
  `set_time_value_fincli` VARCHAR(45) NULL);
   

///creating event for filtering inclination and adding data into tables

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