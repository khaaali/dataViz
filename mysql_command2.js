					*******************To get average of values *********************

SELECT AVG(temperature_data),AVG(inclination_data_X),AVG(inclination_data_Y)
from Astrose_smart_meshIP.sensor_data_table
group by mac_id="00-17-0D-00-00-58-2F-F2";


					************to join by mac_id and count*******************



select  * from
(select mac_id,count(temperature_data)as temp_notif
from sensor_data_table
where (temperature_data >= 23)
group by  mac_id )as t1 
join
(select mac_id,count(inclination_data_X)as inlci_notif 
from sensor_data_table
where (inclination_data_X >= 7.6)
group by  mac_id )as t2
on t1.mac_id=t2.mac_id;






************query for getting mean,threashold value from tables and filtering the sum with sensor_data_table gruoping by mac_id******



select * from 
# sub query yeilds table corresponding macid:00-17-0D-00-00-58-2F-F2, with number of data point in where 
# threshold_table and configurations_mean_table have reached at latest time for temperature data and inclination data
(select mac_id as mac_2ff2,count(temperature_data) as temp_count_2ff2, max(time_stamp) as temp_lastupdate_2ff2
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data >= (select temperature_mean_value from configurations_mean_table
							where config_id=2 )+
					 (select temperature_value from threshold_table
							where id_value=1 )
group by mac_id
having mac_id="00-17-0D-00-00-58-2F-F2")as table_2ff2_temp
# joining the inclination table to temprature table by macid
join
(select mac_id,count(inclination_data_X)as inlci_count_2ff2,max(time_stamp) as incli_lastupdate_2ff2 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=2 )+
					 (select inclination_value_X from threshold_table
							where id_value=1 )                            
group by  mac_id 
having mac_id="00-17-0D-00-00-58-2F-F2")as table_2ff2_incli
on table_2ff2_temp.mac_2ff2=table_2ff2_incli.mac_id ,            

# sub query yeilds table corresponding macid:00-17-0D-00-00-30-3F-17
(select mac_id as mac_3f17,count(temperature_data) as temp_count_3f17,max(time_stamp) as lastupdate_3f17
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=3 )+
						  (select temperature_value from threshold_table
							  where id_value=1 )
group by mac_id
having mac_id="00-17-0D-00-00-30-3F-17")as table_3f17_temp
# joining the tables with macid
join
(select mac_id,count(inclination_data_X)as inlci_count_3f17,max(time_stamp) as incli_lastupdate_3f17 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=3 )+
					 (select inclination_value_X from threshold_table
							where id_value=1 )                            
group by  mac_id 
having mac_id="00-17-0D-00-00-30-3F-17")as table_3f17_incli
on table_3f17_temp.mac_3f17=table_3f17_incli.mac_id ,

# sub query yeilds table corresponding macid:00-17-0D-00-00-30-4D-94
(select mac_id as mac_4d94,count(temperature_data) as temp_count_4d94, max(time_stamp) as lastupdate_4d94
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=1 )+
						  (select temperature_value from threshold_table
							  where id_value=1 )
group by mac_id
having mac_id="00-17-0D-00-00-30-4D-94")as table_4d94_temp
# joining the tables with macid
join
(select mac_id,count(inclination_data_X)as inlci_count_4d94,max(time_stamp) as incli_lastupdate_4d94 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=1 )+
					 (select inclination_value_X from threshold_table
							where id_value=1 )                            
group by  mac_id 
having mac_id="00-17-0D-00-00-30-4D-94")as table_4d94_incli
on table_4d94_temp.mac_4d94=table_4d94_incli.mac_id ;




