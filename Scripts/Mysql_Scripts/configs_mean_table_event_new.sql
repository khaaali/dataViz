# "configs_mean_table_event" event runs every 5 minutes (ideally) to update the 
#`Astrose_smart_meshIP`.`configs_mean_table` table 
# logic will do average/mean of 10 values in decesending order 
# from `Astrose_smart_meshIP`.`sensor_data_table table` 
######## Edidted as mote-id #########
SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT configs_mean_table_event
ON SCHEDULE EVERY 5 minute

DO
  BEGIN
# for mote_id = '001'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 

`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '001'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '001'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '001'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='1';



# for mote_id = '002'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '002'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '002'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '002'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='2';


      
# for mote_id = '003'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '003'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '003'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '003'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='3';


      
# for  mote_id = '004'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature_mean_value`=
(select
  avg(temperature_data) as temp_avg
FROM (
    SELECT 
      temperature_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '004'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a1 ) ,
    
`inclination_mean_value_X`=
(select
    avg(inclination_data_X) as incli_X_avg
FROM (
    SELECT 
      (inclination_data_X)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '004'
      ORDER BY 
      task_id DESC
    LIMIT 10 )
    a2 ),
    
`inclination_mean_value_Y` =
(select
    avg(inclination_data_Y) as incli_Y_avg
FROM (
    SELECT 
      (inclination_data_Y)
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '004'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='4';

  END |
delimiter ;