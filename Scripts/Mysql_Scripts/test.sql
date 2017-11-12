CREATE TABLE `notify_para_table` (
  `notify_id` int(11) NOT NULL AUTO_INCREMENT,
  `temp_thres_add` varchar(10) DEFAULT NULL,
  `temp_thres_sub` varchar(10) DEFAULT NULL,
  `incli_thres_add` varchar(10) DEFAULT NULL,
  `incli_thres_sub` varchar(10) DEFAULT NULL,
  
  `mac_4d94` varchar(45) DEFAULT NULL,
  `moteid_001` varchar(11) DEFAULT NULL,
  `temp_mean_001` varchar(10) DEFAULT NULL,
  `incli_mean_001` varchar(10) DEFAULT NULL,
  `temp_count_add_001` int(11) DEFAULT NULL,
  `temp_lastupdate_add_001` varchar(45) DEFAULT NULL,
  `temp_count_sub_001` int(11) DEFAULT NULL,
  `temp_lastupdate_sub_001` varchar(45) DEFAULT NULL,
  `incli_count_add_001` int(11) DEFAULT NULL,
  `incli_lastupdate_add_001` varchar(45) DEFAULT NULL,
  `incli_count_sub_001` int(11) DEFAULT NULL,
  `incli_lastupdate_sub_001` varchar(45) DEFAULT NULL,
  
  `mac_47fa` varchar(45) DEFAULT NULL,
  `moteid_002` varchar(11) DEFAULT NULL,
  `temp_mean_002` varchar(10) DEFAULT NULL,
  `incli_mean_002` varchar(10) DEFAULT NULL,
  `temp_count_add_002` int(11) DEFAULT NULL,
  `temp_lastupdate_add_002` varchar(45) DEFAULT NULL,
  `temp_count_sub_002` int(11) DEFAULT NULL,
  `temp_lastupdate_sub_002` varchar(45) DEFAULT NULL,
  `incli_count_add_002` int(11) DEFAULT NULL,
  `incli_lastupdate_add_002` varchar(45) DEFAULT NULL,
  `incli_count_sub_002` int(11) DEFAULT NULL,
  `incli_lastupdate_sub_002` varchar(45) DEFAULT NULL,
  
  `mac_4818` varchar(45) DEFAULT NULL,
  `moteid_003` varchar(11) DEFAULT NULL,
  `temp_mean_003` varchar(10) DEFAULT NULL,
  `incli_mean_003` varchar(10) DEFAULT NULL,
  `temp_count_add_003` int(11) DEFAULT NULL,
  `temp_lastupdate_add_003` varchar(45) DEFAULT NULL,
  `temp_count_sub_003` int(11) DEFAULT NULL,
  `temp_lastupdate_sub_003` varchar(45) DEFAULT NULL,
  `incli_count_add_003` int(11) DEFAULT NULL,
  `incli_lastupdate_add_003` varchar(45) DEFAULT NULL,
  `incli_count_sub_003` int(11) DEFAULT NULL,
  `incli_lastupdate_sub_003` varchar(45) DEFAULT NULL,
  
  `mac_4958` varchar(45) DEFAULT NULL,
  `moteid_004` varchar(11) DEFAULT NULL,
  `temp_mean_004` varchar(10) DEFAULT NULL,
  `incli_mean_004` varchar(10) DEFAULT NULL,
  `temp_count_add_004` int(11) DEFAULT NULL,
  `temp_lastupdate_add_004` varchar(45) DEFAULT NULL,
  `temp_count_sub_004` int(11) DEFAULT NULL,
  `temp_lastupdate_sub_004` varchar(45) DEFAULT NULL,
  `incli_count_add_004` int(11) DEFAULT NULL,
  `incli_lastupdate_add_004` varchar(45) DEFAULT NULL,
  `incli_count_sub_004` int(11) DEFAULT NULL,
  `incli_lastupdate_sub_004` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notify_id`))



INSERT INTO `sensor_data_table` VALUES 
(4,'00-17-0d-00-00-59-06-3c',565,'20.63','19','90.7105','90.8365','0.0000','2017-11-12  19:08:47 ', 1510510136525),
(5,'00-17-0d-00-00-59-03-2c',566,'20.63','19','90.7105','90.8365','0.0000','2017-11-12  19:08:48 ', 1510510146525),
(6,'00-17-0d-00-00-59-01-1c',567,'20.63','19','90.7105','90.8365','0.0000','2017-11-12  19:08:49 ', 1510510156525)


'3', '00-17-0d-00-00-59-06-2c', '564', '22.41', '20.5', '90.57', '92.29', '0.00', '2017-11-12  19:08:46 ', '1510510126525'
