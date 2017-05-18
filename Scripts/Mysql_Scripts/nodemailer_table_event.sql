SET GLOBAL event_scheduler='ON';
delimiter |
CREATE EVENT nodemailer_table_event
ON SCHEDULE EVERY 1 minute
DO
  BEGIN

 INSERT INTO nodemailer_table (TempUpLimit_a1,TempLowLimit_a2,IncliUpLimit_a3,IncliLowLimit_a4,
 								 TempUpLimit_b1,TempLowLimit_b2,IncliUpLimit_b3,IncliLowLimit_b4,
 								 TempUpLimit_c1,TempLowLimit_c2,IncliUpLimit_c3,IncliLowLimit_c4,
								 TempUpLimit_d1,TempLowLimit_d2,IncliUpLimit_d3,IncliLowLimit_d4) 


select * from
(select  concat("Mac-id: ",mac_4d94," has reached threshold ",temp_mean_4d94+temp_thres_add ," at ", temp_lastupdate_4d94_add) 
as TempUpLimit_a1 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempUpLimit_a1
join
(select  concat("Mac-id: ",mac_4d94," has reached threshold ",temp_mean_4d94-temp_thres_sub," at  ", temp_lastupdate_4d94_sub) 
as TempLowLimit_a2 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempLowLimit_a2
join
(select  concat("Mac-id: ",mac_4d94," has reached threshold ",incli_mean_4d94+incli_thres_add," at  ", incli_lastupdate_4d94_add) 
as IncliUpLimit_a3 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliUpLimit_a3
join
(select  concat("Mac-id: ",mac_4d94," has reached threshold ",incli_mean_4d94-incli_thres_sub," at  ", incli_lastupdate_4d94_sub) 
as IncliLowLimit_a4 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliLowLimit_a4

join
(select  concat("Mac-id: ",mac_47fa," has reached threshold ",temp_mean_47fa+temp_thres_add ," at ", temp_lastupdate_47fa_add) 
as TempUpLimit_b1 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempUpLimit_b1
join
(select  concat("Mac-id: ",mac_47fa," has reached threshold ",temp_mean_47fa-temp_thres_sub," at  ", temp_lastupdate_47fa_sub) 
as TempLowLimit_b2 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempLowLimit_b2
join
(select  concat("Mac-id: ",mac_47fa," has reached threshold ",incli_mean_47fa+incli_thres_add," at  ", incli_lastupdate_47fa_add) 
as IncliUpLimit_b3 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliUpLimit_b3
join
(select  concat("Mac-id: ",mac_47fa," has reached threshold ",incli_mean_47fa-incli_thres_sub," at  ", incli_lastupdate_47fa_sub) 
as IncliLowLimit_b4 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliLowLimit_b4

join
(select  concat("Mac-id: ",mac_4818," has reached threshold ",temp_mean_4818+temp_thres_add ," at ", temp_lastupdate_4818_add) 
as TempUpLimit_c1 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempUpLimit_c1
join
(select  concat("Mac-id: ",mac_4818," has reached threshold ",temp_mean_4818-temp_thres_sub," at  ", temp_lastupdate_4818_sub) 
as TempLowLimit_c2 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempLowLimit_c2
join
(select  concat("Mac-id: ",mac_4818," has reached threshold ",incli_mean_4818+incli_thres_add," at  ", incli_lastupdate_4818_add) 
as IncliUpLimit_c3 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliUpLimit_c3
join
(select  concat("Mac-id: ",mac_4818," has reached threshold ",incli_mean_4818-incli_thres_sub," at  ", incli_lastupdate_4818_sub) 
as IncliLowLimit_c4 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliLowLimit_c4

join
(select  concat("Mac-id: ",mac_4958," has reached threshold ",temp_mean_4958+temp_thres_add ," at ", temp_lastupdate_4958_add) 
as TempUpLimit_d1 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempUpLimit_d1
join
(select  concat("Mac-id: ",mac_4958," has reached threshold ",temp_mean_4958-temp_thres_sub," at  ", temp_lastupdate_4958_sub) 
as TempLowLimit_d2 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as TempLowLimit_d2
join
(select  concat("Mac-id: ",mac_4958," has reached threshold ",incli_mean_4958+incli_thres_add," at  ", incli_lastupdate_4958_add) 
as IncliUpLimit_d3 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliUpLimit_d3
join
(select  concat("Mac-id: ",mac_4958," has reached threshold ",incli_mean_4958-incli_thres_sub," at  ", incli_lastupdate_4958_sub) 
as IncliLowLimit_d4 from notify_mail_para_table where notify_id=(SELECT MAX(notify_id) FROM notify_mail_para_table)) as IncliLowLimit_d4;


	END |

delimiter ;





CREATE table payload_mail_table(
payload_id INT(11) NOT NULL primary key,
TempUpLimit_a1 LONGTEXT  NULL,
TempLowLimit_a2 LONGTEXT  NULL,
IncliUpLimit_a3 LONGTEXT  NULL,
IncliLowLimit_a4 LONGTEXT  NULL,
TempUpLimit_b1 LONGTEXT  NULL,
TempLowLimit_b2 LONGTEXT  NULL,
IncliUpLimit_b3 LONGTEXT  NULL,
IncliLowLimit_b4 LONGTEXT  NULL,
TempUpLimit_c1 LONGTEXT  NULL,
TempLowLimit_c2 LONGTEXT  NULL,
IncliUpLimit_c3 LONGTEXT  NULL,
IncliLowLimit_c4 LONGTEXT  NULL,
TempUpLimit_d1 LONGTEXT  NULL,
TempLowLimit_d2 LONGTEXT  NULL,
IncliUpLimit_d3 LONGTEXT  NULL,
IncliLowLimit_d4 LONGTEXT  NULL);


