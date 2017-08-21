# "configs_mean_table_event" event runs every 5 minutes (ideally) to update the 
#`Astrose_smart_meshIP`.`configs_mean_table` table 
# logic will do average/mean of 10 values in decesending order 
# from `Astrose_smart_meshIP`.`sensor_data_table table` 

##  add configuartions for motes manually to config mean table in the database 
#depending on number of motes. this event only UPDATES the meanvalues of temperarure and inclination.
# macid and moteid and config id should be added manually or by script
######## Edidted as mote-id #########

SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT configs_mean_table_event
ON SCHEDULE EVERY 1 minute

DO
  BEGIN
# for mote_id = '564'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 

`temperature1_mean_value`=
(select
  avg(temperature1_data) as temp_avg
FROM (
    SELECT 
      temperature1_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '564'
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
      mote_id = '564'
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
      mote_id = '564'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='001';



# for mote_id = '002'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature1_mean_value`=
(select
  avg(temperature1_data) as temp_avg
FROM (
    SELECT 
      temperature1_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '565'
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
      mote_id = '565'
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
      mote_id = '565'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='002';


      
# for mote_id = '003'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature1_mean_value`=
(select
  avg(temperature1_data) as temp_avg
FROM (
    SELECT 
      temperature1_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '566'
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
      mote_id = '566'
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
      mote_id = '566'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='003';


      
# for  mote_id = '004'
UPDATE `Astrose_smart_meshIP`.`configs_mean_table` 
SET 
`temperature1_mean_value`=
(select
  avg(temperature1_data) as temp_avg
FROM (
    SELECT 
      temperature1_data
    FROM 
      Astrose_smart_meshIP.sensor_data_table
      WHERE 
      mote_id = '567'
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
      mote_id = '567'
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
      mote_id = '567'
      ORDER BY 
      task_id DESC
    LIMIT 10 ) 
    a3),
 
`config_time`=
(select now())
    
WHERE `configs_mean_table`.`config_id`='004';

  END |
delimiter ;