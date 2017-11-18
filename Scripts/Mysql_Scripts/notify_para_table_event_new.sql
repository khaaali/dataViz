# "notify_para_table_event" event utilises the data from threshold_table,configs_mean_table on sensor_data_table 
# handles the logic and populates the Astrose_smart_meshIP.notify_para_table table with parameters required 
# to create payload for `Astrose_smart_meshIP`.`nodemailer_table` and  this event 

######## Edidted as mote-id #########
SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT notify_para_table_event
ON SCHEDULE EVERY 10 SECOND
DO
  BEGIN


      Insert into Astrose_smart_meshIP.notify_para_table(

temp_thres_add,temp_thres_sub,incli_thres_add,incli_thres_sub,

moteid_001,temp_mean_001,incli_mean_001,temp_count_add_001,temp_lastupdate_add_001,temp_count_sub_001,temp_lastupdate_sub_001,incli_count_add_001,
incli_lastupdate_add_001,incli_count_sub_001,incli_lastupdate_sub_001,

moteid_002,temp_mean_002,incli_mean_002,temp_count_add_002,temp_lastupdate_add_002,temp_count_sub_002,temp_lastupdate_sub_002,incli_count_add_002,
incli_lastupdate_add_002,incli_count_sub_002,incli_lastupdate_sub_002,

moteid_003,temp_mean_003,incli_mean_003,temp_count_add_003,temp_lastupdate_add_003,temp_count_sub_003,temp_lastupdate_sub_003,incli_count_add_003,
incli_lastupdate_add_003,incli_count_sub_003,incli_lastupdate_sub_003,

moteid_004,temp_mean_004,incli_mean_004,temp_count_add_004,temp_lastupdate_add_004,temp_count_sub_004,temp_lastupdate_sub_004,incli_count_add_004,
incli_lastupdate_add_004,incli_count_sub_004,incli_lastupdate_sub_004

)

select * from 

			########## below statements are constant for all the mac ids, which are threshold values ########

# joining the threshold value from threshold table
(select temperature1_value_add as temp_thres_add from threshold_table
							where id_value=1 ) as temp_threshold_add                           
join
# joining the threshold value from threshold table
(select temperature1_value_sub as temp_thres_sub from threshold_table
							where id_value=1 ) as temp_threshold_sub 
 join
(select inclination_value_X_add as incli_thres_add from threshold_table
							where id_value=1 ) as incli_threshold_add
 join
(select inclination_value_X_sub as incli_thres_sub from threshold_table
							where id_value=1 ) as incli_threshold_sub 


# mote_id to the count(tempdata)
# sub query yeilds table corresponding macid:001, with number of data points, where 
# threshold_table and configs_mean_table have reached at latest time for temperature data and inclination data



									########### for moteid:001 ############
                            
join
# sub query yeilds table corresponding macid:001
(select mote_id as moteid_001 from sensor_data_table
group by  mote_id 
having mote_id="564")as t1



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mote_id="001")
(select temperature1_mean_value as temp_mean_001 from configs_mean_table
							where config_id=001) as mean_temp_001
join
(select inclination_mean_value_X as incli_mean_001 from configs_mean_table
							where config_id=001) as mean_incli_001  





					############### temperature part of algorithm   mote_id="001" ##################                
# join tables
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
join
(select count(temperature1_data) as temp_count_add_001, max(time_stamp) as temp_lastupdate_add_001
from sensor_data_table 
where temperature1_data >= (select temperature1_mean_value from configs_mean_table
							  where config_id=001 )+
						  (select temperature1_value_add from threshold_table
							  where id_value=1 ) and mote_id="564")as temp_001_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_sub_001, max(time_stamp) as temp_lastupdate_sub_001
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature1_data <= (select temperature1_mean_value from configs_mean_table
							where config_id=001 )-
					 (select temperature1_value_sub from threshold_table
							where id_value=1 ) and  mote_id="564")as temp_001_sub                              						                           
                           
                           
                           
                           
						############## inclination part of algorithm   mote_id="001" ##################
# joining the tables 
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
join
(select count(inclination_data_X)as inlci_count_add_001,max(time_stamp) as incli_lastupdate_add_001 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=001 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and mote_id="564")as incli_001_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_sub_001, max(time_stamp) as incli_lastupdate_sub_001
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=001 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mote_id="564")as incli_001_sub 
                            





								############# For moteid:002 ########################
join
(select mote_id as moteid_002 from sensor_data_table
group by  mote_id 
having mote_id="565")as t2



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mote_id="002")
(select temperature1_mean_value as temp_mean_002 from configs_mean_table
							where config_id=002) as mean_temp_002
join
(select inclination_mean_value_X as incli_mean_002 from configs_mean_table
							where config_id=002 ) as mean_incli_002                            




					############ temperature part of algorithm  mote_id="002") ##################
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_add_002, max(time_stamp) as temp_lastupdate_add_002
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature1_data >= (select temperature1_mean_value from configs_mean_table
							where config_id=002 )+
					 (select temperature1_value_add from threshold_table
							where id_value=1 ) and  mote_id="565")as temp_002_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_sub_002, max(time_stamp) as temp_lastupdate_sub_002
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature1_data <= (select temperature1_mean_value from configs_mean_table
							where config_id=002 )-
					 (select temperature1_value_sub from threshold_table
							where id_value=1 )	and  mote_id="565")as temp_002_sub                         
                           
                           

					############ inclination part of algorithm  mote_id="002") ##################
join
# joining the inclination table to temprature table
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X)as inlci_count_add_002,max(time_stamp) as incli_lastupdate_add_002
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=002 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mote_id="565")as incli_002_add       
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_sub_002, max(time_stamp) as incli_lastupdate_sub_002
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=002 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mote_id="565")as incli_002_sub
                            
 
  
                            
                            
							############### For mote_id:003 ####################

join
# sub query yeilds table corresponding mote_id:003
(select mote_id as moteid_003 from sensor_data_table
group by  mote_id 
having mote_id="566")as t3



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mote_id="003")
(select temperature1_mean_value as temp_mean_003 from configs_mean_table
							where config_id=003) as mean_temp_003
join
(select inclination_mean_value_X as incli_mean_003 from configs_mean_table
							where config_id=003 ) as mean_incli_003  








				############ temperature part of algorithm   mote_id="003" ##################
# join tables
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_add_003,max(time_stamp) as temp_lastupdate_add_003
from sensor_data_table 
where temperature1_data >= (select temperature1_mean_value from configs_mean_table
							  where config_id=003 )+
						  (select temperature1_value_add from threshold_table
							  where id_value=1 ) and  mote_id="566")as temp_003_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_sub_003, max(time_stamp) as temp_lastupdate_sub_003
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature1_data <= (select temperature1_mean_value from configs_mean_table
							where config_id=003 )-
					 (select temperature1_value_sub from threshold_table
							where id_value=1 ) and  mote_id="566")as temp_003_sub
                      
					
                    
                    
					############### inclination part of algorithm   mote_id="003" ##################
join
# joining the tables 
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X)as inlci_count_add_003,max(time_stamp) as incli_lastupdate_add_003 
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=003 )+
					  (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mote_id="566")as incli_003_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_sub_003, max(time_stamp) as incli_lastupdate_sub_003
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=003 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mote_id="566")as incli_003_sub                            
                            






								############# For macid:004 ########################
join
(select mote_id as moteid_004 from sensor_data_table
group by  mote_id 
having mote_id="567")as t4



# configuration values from mean tables
join
# joining the mean value from temperature mean table for  mote_id="00-17-0D-00-00-58-2F-F2")
(select temperature1_mean_value as temp_mean_004 from configs_mean_table
							where config_id=004) as mean_temp_004
join
(select inclination_mean_value_X as incli_mean_004 from configs_mean_table
							where config_id=004 ) as mean_incli_004                            




					############ temperature part of algorithm  mote_id="004") ##################
join
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_add_004, max(time_stamp) as temp_lastupdate_add_004
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature1_data >= (select temperature1_mean_value from configs_mean_table
							where config_id=004 )+
					 (select temperature1_value_add from threshold_table
							where id_value=1 ) and  mote_id="567")as temp_004_add
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(temperature1_data) as temp_count_sub_004, max(time_stamp) as temp_lastupdate_sub_004
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
temperature1_data <= (select temperature1_mean_value from configs_mean_table
							where config_id=004 )-
					 (select temperature1_value_sub from threshold_table
							where id_value=1 )	and  mote_id="567")as temp_004_sub                         
                           
                           

					############ inclination part of algorithm  mote_id="00-17-0D-00-00-58-2F-F2") ##################
join
# joining the inclination table to temprature table
# The adding(UP LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X)as inlci_count_add_004,max(time_stamp) as incli_lastupdate_add_004
from sensor_data_table
where 
inclination_data_X >= (select inclination_mean_value_X from configs_mean_table
							where config_id=004 )+
					 (select inclination_value_X_add from threshold_table
							where id_value=1 ) and  mote_id="567")as incli_004_add       
join
# The subtracting(DOWN LIMIT) part of algorithm with respect to threshold_table and configs_mean_table
(select count(inclination_data_X) as incli_count_sub_004, max(time_stamp) as incli_lastupdate_sub_004
from sensor_data_table 
where
# operators used for filtering the data from threshold_table and configs_mean_table
inclination_data_X <= (select inclination_mean_value_X from configs_mean_table
							where config_id=004 )-
					 (select inclination_value_X_sub from threshold_table
							where id_value=1 ) and  mote_id="567")as incli_004_sub
  						;
  						
  


  						
  
  
	END |

delimiter ;

