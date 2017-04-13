Insert into Astrose_smart_meshIP.notify_mail_table(
mac_2ff2,temp_count_2ff2,temp_lastupdate_2ff2,inlci_count_2ff2,incli_lastupdate_2ff2,
mac_3f17,temp_count_3f17,temp_lastupdate_3f17,inlci_count_3f17,incli_lastupdate_3f17,
mac_4d94,temp_count_4d94,temp_lastupdate_4d94,inlci_count_4d94,incli_lastupdate_4d94

)

select * from 
# mac_id to the count(tempdata)
# sub query yeilds table corresponding macid:00-17-0D-00-00-58-2F-F2, with number of data points, where 
# threshold_table and configurations_mean_table have reached at latest time for temperature data and inclination data

(select mac_id as mac_2ff2 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-58-2F-F2")as t1
join

(select count(temperature_data) as temp_count_2ff2, max(time_stamp) as temp_lastupdate_2ff2
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configurations_mean_table
temperature_data >= (select temperature_mean_value from configurations_mean_table
							where config_id=2 )+
					 (select temperature_value from threshold_table
							where id_value=1 )
and  mac_id="00-17-0D-00-00-58-2F-F2")as temp_2ff2

# joining the inclination table to temprature table
join
(select count(inclination_data_X)as inlci_count_2ff2,max(time_stamp) as incli_lastupdate_2ff2 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=2 )+
					 (select inclination_value_X from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-58-2F-F2")as incli_2ff2,       

     

# sub query yeilds table corresponding macid:00-17-0D-00-00-30-3F-17

(select mac_id as mac_3f17 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-3F-17")as t2
join

(select count(temperature_data) as temp_count_3f17,max(time_stamp) as temp_lastupdate_3f17
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=3 )+
						  (select temperature_value from threshold_table
							  where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as temp_3f17
# joining the tables 
join
(select count(inclination_data_X)as inlci_count_3f17,max(time_stamp) as incli_lastupdate_3f17 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=3 )+
					  (select inclination_value_X from threshold_table
							where id_value=1 ) and  mac_id="00-17-0D-00-00-30-3F-17")as incli_3f17,

# sub query yeilds table corresponding macid:00-17-0D-00-00-30-4D-94

(select mac_id as mac_4d94 from sensor_data_table
group by  mac_id 
having mac_id="00-17-0D-00-00-30-4D-94")as t3
join

(select count(temperature_data) as temp_count_4d94, max(time_stamp) as temp_lastupdate_4d94
from sensor_data_table 
where temperature_data >= (select temperature_mean_value from configurations_mean_table
							  where config_id=1 )+
						  (select temperature_value from threshold_table
							  where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as temp_4d94
# joining the tables 
join
(select count(inclination_data_X)as inlci_count_4d94,max(time_stamp) as incli_lastupdate_4d94 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configurations_mean_table
							where config_id=1 )+
					 (select inclination_value_X from threshold_table
							where id_value=1 ) and mac_id="00-17-0D-00-00-30-4D-94")as table_4d94_incli
 ;


