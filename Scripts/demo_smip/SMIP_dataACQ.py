#!/usr/bin/python
# edited/expermented file
#============================ adjust path =====================================
import sys,os
import numpy
import time,datetime 
import MySQLdb,csv
import numpy as np

import threading
from   SmartMeshSDK.protocols.Hr       import HrParser
from   SmartMeshSDK.utils              import AppUtils,                   \
                                              FormatUtils
from   SmartMeshSDK.ApiDefinition      import IpMgrDefinition
from   SmartMeshSDK.IpMgrConnectorMux  import IpMgrConnectorMux,          \
                                              IpMgrSubscribe
from SmartMeshSDK.IpMgrConnectorSerial  import IpMgrConnectorSerial
from   dustUI                          import dustWindow,                 \
                                              dustFrameConnection,        \
                                              dustFrameTable

from   SmartMeshSDK.protocols.oap           import OAPDispatcher,    \
                                                   OAPNotif                                              
import traceback

from SmartMeshSDK                       import sdk_version
#============================ logging =========================================

import logging
import random



if __name__ == "__main__":
    here = sys.path[0]
    sys.path.insert(0, os.path.join(here, '..', '..','libs'))
    sys.path.insert(0, os.path.join(here, '..', '..','external_libs'))

#============================ imports =========================================

import traceback

from SmartMeshSDK                       import sdk_version
from SmartMeshSDK.IpMgrConnectorSerial  import IpMgrConnectorSerial
from SmartMeshSDK.IpMgrConnectorMux     import IpMgrSubscribe
from   SmartMeshSDK.utils              import AppUtils,                   \
                                              FormatUtils

#============================ helper functions ================================

def twos_comp(val, bits):
    """compute the 2's complement of int value val"""
    if (val & (1 << (bits - 1))) != 0: # if sign bit is set e.g., 8bit: 128-255
        val = val - (1 << bits)        # compute negative value
    return val                         # return positive value as is

def hextobin(hexval):
        '''
        Takes a string representation of hex data with
        arbitrary length and converts to string representation
        of binary.  Includes padding 0s
        '''
        thelen = len(hexval)*4
        binval = bin(int(hexval, 16))[2:]
        while ((len(binval)) < thelen):
            binval = '0' + binval
        #print binval
        return binval


def currentlocaltime():
    return time.strftime("%a, %d %b %Y %H:%M:%S CEST", time.localtime())

def timeStamp():
    return time.strftime("%Y-%m-%d  %H:%M:%S ", time.localtime()) # 2017-05-03  01:30:17

def epochTimeStamp():
    return int(round(time.time() * 1000)) #  1494212166433  

def currenttime():
    return str(datetime.now())      

class Database:

    host = 'localhost'
    user = 'root'
    password = 'sairam'
    db = 'astrose_smart_meship'

    def __init__(self):
        self.connection = MySQLdb.connect(self.host, self.user, self.password, self.db)
        self.cursor = self.connection.cursor()

    def insert(self, query,any):
        try:
            self.cursor.execute(query,any)
            self.connection.commit()
        except:
            self.connection.rollback()



    def query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)

        return cursor.fetchall()

    def __del__(self):
        self.connection.close()


def handle_oap_data(notifName, notifParams):
    print "im in"
    mac_id  = FormatUtils.formatMacString(notifParams.macAddress)
    payload= notifParams
    print mac_id, payload
    print '{0}: "{1}"'.format('%02x' %i for i in notifParams.data)


def _notifCallback(notifName, notifParams):
        
        try:
        
            if (notifName ==IpMgrSubscribe.IpMgrSubscribe.NOTIFHEALTHREPORT):
                print notifName
                hrParser  = HrParser.HrParser()
            
                mac_id        = FormatUtils.formatMacString(notifParams.macAddress)
                hr         = hrParser.parseHr(notifParams.payload)
                print mac_id,hr

                if mac_id=="00-17-0d-00-00-59-06-2c":
                    hr_mote_id=564

                elif mac_id=="00-17-0d-00-00-59-06-xx":
                    hr_mote_id=565

                elif mac_id=="00-17-0d-00-00-59-06-xx":
                    hr_mote_id=566 

                elif mac_id=="00-17-0d-00-00-59-06-xx":
                    hr_mote_id=567            
            
            
                db = Database()
                print hr
                
                if 'Device' in hr:
                    Db_array=[]
                    voltage=hr['Device']['batteryVoltage']
           # Db_array.append(voltage)
                    print 'voltage',voltage/1000.0 
                    packetloss=hr['Device']['numRxLost'] 
    #send to Db_array     and reset Db_array 
               
                    Db_array.append(mac_id)
                    Db_array.append(hr_mote_id)
                    Db_array.append(timeStamp())
                    Db_array.append(epochTimeStamp())
                    Db_array.append(voltage/1000.0)
                    Db_array.append(packetloss)
                
                    insert_query = """ INSERT INTO health_report_table (`hr_macid`,`hr_mote_id`,`hr_timeStamp`,`hr_epochStamp`,`hr_batt_voltage`,`hr_packetloss`) VALUES (%s,%s,%s,%s,%s,%s)"""
                
                    print insert_query,Db_array
                    db.insert(insert_query,Db_array)
                

                elif 'Neighbors'in hr :
                    average=[]
                    Db_array=[]
                    for neighbor in hr['Neighbors']['neighbors']:
                        average.append(neighbor['rssi'])
                    print average
                
                    avg_rssi_signal=numpy.mean(average)
    
                    Db_array.append(mac_id)
                    Db_array.append(hr_mote_id)
                    Db_array.append(timeStamp())
                    Db_array.append(epochTimeStamp())
                    Db_array.append(avg_rssi_signal)

                    print "signal strength: ", avg_rssi_signal

                    insert_query = """ INSERT INTO health_report_table (`hr_macid`,`hr_mote_id`,`hr_timeStamp`,`hr_epochStamp`,`hr_avg_rssi`) VALUES (%s,%s,%s,%s,%s)"""
                
                    print insert_query,Db_array
                    db.insert(insert_query,Db_array)


            elif(notifName==IpMgrSubscribe.IpMgrSubscribe.NOTIFDATA):
                #print notifName
                #print "in elsif of notifdata"
                mac_id  = FormatUtils.formatMacString(notifParams.macAddress)

                payload_dec= notifParams.data
                payload_hex= '{0}'.format(
                    '-'.join(['%02x'%i for i in notifParams.data])
                    )

                #print mac_id, payload_dec              
                #print payload_hex
                

                #mote ID
                mote_id0=payload_dec[0]
                mote_id1=payload_dec[1]
                
                mote_id= (mote_id0<<8) | mote_id1
                #print "id",sens_id

                #Temperature sensor 1
                t1_d2= payload_dec[2]
                t1_d3= payload_dec[3]
                temperature1_data= twos_comp(t1_d2,8)+0.01*t1_d3
                #print('temperature1_data',temperature1_data)

                #Temperature sensor 2
                t2_d4= payload_dec[4]
                t2_d5= payload_dec[5]
                temperature2_data=23+twos_comp(t2_d4,8)*0.5

                #Inclination sensor X
                incliX_d6=payload_dec[6]
                incliX_d7=payload_dec[7]

                #Inclination sensor Y
                incliY_d8=payload_dec[8]
                incliY_d9=payload_dec[9]


                #Inclination sensor Z
                incliZ_d10=payload_dec[10]
                incliZ_d11=payload_dec[11]



##############################################
#                 LSB|MSB
##############################################
                
                incliX_=twos_comp(incliX_d7,8)<<8 | incliX_d6
                incliY_=twos_comp(incliY_d9,8)<<8 | incliY_d8
                incliZ_=twos_comp(incliZ_d11,8)<<8 | incliZ_d10

                #print "2s compliment"
                #print twos_comp(incliX_d7,8),twos_comp(incliY_d9,8),twos_comp(incliZ_d11,8)

                #print "after 2's compliment and bitshift"
                #print(incliX_,incliY_,incliZ_)
                
                incliX_=incliX_/16384.0
                incliX_="{0:.2f}".format(incliX_)

                incliY_=incliY_/16384.0
                incliY_="{0:.2f}".format(incliY_)

                incliZ_=incliZ_/16384.0
                incliZ_="{0:.2f}".format(incliZ_)

                incliX_=float(incliX_)
                incliY_=float(incliY_)
                incliZ_=float(incliZ_)

                print "after division with constant and rounded to 2 decimals"
                print(incliX_,incliY_,incliZ_)
                
                #### checking incliZ_ for range -1 < arccos(Z) < 1

                if incliZ_ >=1 :
                   incliZ_=1

                elif incliZ_ <=-1: 
                    incliZ_= -1  

                elif incliX_ >=1: 
                    incliX_= 1   

                elif incliX_ <=-1: 
                    incliX_= -1   

                elif incliY_ >=1: 
                    incliY_= 1 
                
                elif incliY_ <=-1: 
                    incliY_= -1 
                
                inclination_data_X=np.arccos(incliX_)*(180/np.pi)
                inclination_data_X="{0:.2f}".format(inclination_data_X)

                inclination_data_Y=np.arccos(incliY_)*(180/np.pi)
                inclination_data_Y="{0:.2f}".format(inclination_data_Y)
                
                inclination_data_Z=np.arccos(incliZ_)*(180/np.pi)
                inclination_data_Z="{0:.2f}".format(inclination_data_Z)

                print "inclination data of XYZ:"
                print mac_id,mote_id,temperature1_data,temperature2_data,inclination_data_X,inclination_data_Y,inclination_data_Z

                Db_array=[]
                Db_array.append(mac_id)
                Db_array.append(mote_id)
                Db_array.append(temperature1_data)
                Db_array.append(temperature2_data)
                Db_array.append(inclination_data_X)
                Db_array.append(inclination_data_Y)
                Db_array.append(inclination_data_Z)               
                Db_array.append(timeStamp())
                Db_array.append(epochTimeStamp())

                insert_query = """ INSERT INTO sensor_data_table (mac_id, mote_id, temperature1_data, temperature2_data, inclination_data_X, inclination_data_Y, inclination_data_Z, time_stamp, epoch_time_stamp) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"""

                db = Database()
                db.insert(insert_query,Db_array)



             
        except Exception as err:
            print type(err)
            print err
            raise



#============================ main ============================================

try:
    print 'SimpleIPUpstreamMgr (c) Dust Networks'
    print 'SmartMesh SDK {0}\n'.format('.'.join([str(b) for b in sdk_version.VERSION]))
    print 'Note: Use with SimpleIPUpstreamMote\n'
    
    #=====
    print "- create the variable 'mgrconnector'"
    
    mgrconnector  = IpMgrConnectorSerial.IpMgrConnectorSerial()
    
    #===== 
    print "- connect to the manager's serial port"
    
    serialport     = raw_input("Enter the serial API port of SmartMesh IP Manager (e.g. /dev/ttyUSB5): ")
    mgrconnector.connect({'port': serialport})
    
    #=====
    print "- subscribe to data notifications "
    
    subscriber = IpMgrSubscribe.IpMgrSubscribe(mgrconnector)
    subscriber.start()
    subscriber.subscribe(
        notifTypes =    [
                            IpMgrSubscribe.IpMgrSubscribe.NOTIFDATA,
                            IpMgrSubscribe.IpMgrSubscribe.NOTIFHEALTHREPORT,
                        ],
        fun =           _notifCallback,
        isRlbl =        True,
    )

    #===
    raw_input("Press any key to stop.")
    
    mgrconnector.disconnect()
    
    print 'Script ended normally.'

except:
    traceback.print_exc()
    print 'Script ended with an error.'
    
raw_input('Press Enter to close.')

