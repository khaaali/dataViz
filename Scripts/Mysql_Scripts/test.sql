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