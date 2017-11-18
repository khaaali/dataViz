# "nodemailer_table_event" event populates the `Astrose_smart_meshIP`.`nodemailer_table` table 
# with payload* required to send the mail 
# (payload depends on `notify_para_table` table and its event 'notify_para_table_event')

######## Edidted as mote-id #########
SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT nodemailer_table_event
ON SCHEDULE EVERY 10 SECOND
DO
  BEGIN

 INSERT INTO nodemailer_table (TempUpLimit_a1,TempLowLimit_a2,IncliUpLimit_a3,IncliLowLimit_a4,
 								 TempUpLimit_b1,TempLowLimit_b2,IncliUpLimit_b3,IncliLowLimit_b4,
 								 TempUpLimit_c1,TempLowLimit_c2,IncliUpLimit_c3,IncliLowLimit_c4,
								 TempUpLimit_d1,TempLowLimit_d2,IncliUpLimit_d3,IncliLowLimit_d4) 


select * from
(select  concat("Mote-id: ",moteid_001," has reached threshold ",temp_mean_001+temp_thres_add ," at ", temp_lastupdate_add_001) 
as TempUpLimit_a1 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempUpLimit_a1
join
(select  concat("Mote-id: ",moteid_001," has reached threshold ",temp_mean_001-temp_thres_sub," at  ", temp_lastupdate_sub_001) 
as TempLowLimit_a2 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempLowLimit_a2
join
(select  concat("Mote-id: ",moteid_001," has reached threshold ",incli_mean_001+incli_thres_add," at  ", incli_lastupdate_add_001) 
as IncliUpLimit_a3 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliUpLimit_a3
join
(select  concat("Mote-id: ",moteid_001," has reached threshold ",incli_mean_001-incli_thres_sub," at  ", incli_lastupdate_sub_001) 
as IncliLowLimit_a4 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliLowLimit_a4

join
(select  concat("Mote-id: ",moteid_002," has reached threshold ",temp_mean_002+temp_thres_add ," at ", temp_lastupdate_add_002) 
as TempUpLimit_b1 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempUpLimit_b1
join
(select  concat("Mote-id: ",moteid_002," has reached threshold ",temp_mean_002-temp_thres_sub," at  ", temp_lastupdate_sub_002) 
as TempLowLimit_b2 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempLowLimit_b2
join
(select  concat("Mote-id: ",moteid_002," has reached threshold ",incli_mean_002+incli_thres_add," at  ", incli_lastupdate_add_002) 
as IncliUpLimit_b3 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliUpLimit_b3
join
(select  concat("Mote-id: ",moteid_002," has reached threshold ",incli_mean_002-incli_thres_sub," at  ", incli_lastupdate_sub_002) 
as IncliLowLimit_b4 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliLowLimit_b4

join
(select  concat("Mote-id: ",moteid_003," has reached threshold ",temp_mean_003+temp_thres_add ," at ", temp_lastupdate_add_003) 
as TempUpLimit_c1 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempUpLimit_c1
join
(select  concat("Mote-id: ",moteid_003," has reached threshold ",temp_mean_003-temp_thres_sub," at  ", temp_lastupdate_sub_003) 
as TempLowLimit_c2 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempLowLimit_c2
join
(select  concat("Mote-id: ",moteid_003," has reached threshold ",incli_mean_003+incli_thres_add," at  ", incli_lastupdate_add_003) 
as IncliUpLimit_c3 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliUpLimit_c3
join
(select  concat("Mote-id: ",moteid_003," has reached threshold ",incli_mean_003-incli_thres_sub," at  ", incli_lastupdate_sub_003) 
as IncliLowLimit_c4 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliLowLimit_c4

join
(select  concat("Mote-id: ",moteid_004," has reached threshold ",temp_mean_004+temp_thres_add ," at ", temp_lastupdate_add_004) 
as TempUpLimit_d1 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempUpLimit_d1
join
(select  concat("Mote-id: ",moteid_004," has reached threshold ",temp_mean_004-temp_thres_sub," at  ", temp_lastupdate_sub_004) 
as TempLowLimit_d2 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as TempLowLimit_d2
join
(select  concat("Mote-id: ",moteid_004," has reached threshold ",incli_mean_004+incli_thres_add," at  ", incli_lastupdate_add_004) 
as IncliUpLimit_d3 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliUpLimit_d3
join
(select  concat("Mote-id: ",moteid_004," has reached threshold ",incli_mean_004-incli_thres_sub," at  ", incli_lastupdate_sub_004) 
as IncliLowLimit_d4 from notify_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_para_table)) as IncliLowLimit_d4;


	END |

delimiter ;





