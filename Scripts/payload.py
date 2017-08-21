import os
import numpy as np
import sys, random, math


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


# in hex
#old data
payload="ffff 155b fbff 2500 e9ff d542 ffff ffff ffff ffff ffff ffff"

#in decimal
#old from fabian
#data_new=[255, 255, 23, 52, 254, 255, 02, 26, 46, 224, 216, 240, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,255, 255]
#20 august
#data_new=[2, 52, 22, 82, 252, 255, 229, 0, 197, 253, 201, 66, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
data_new=[2, 52, 21, 1, 249, 255, 101, 254, 85, 255, 173, 66, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
payload_hex="02-34-15-01-f9-ff-65-fe-55-ff-ad-42-ff-ff-ff-ff-ff-ff-ff-ff-ff-ff-ff-ff"

print "da",data_new[0]


sensorId=payload[0:4]
print "sens",sensorId
sensorId_= bin(int(sensorId[0:2],16))[2:]
print "sens_",sensorId_


sens_id1=data_new[0]
sens_id2=data_new[1]

sens_id= (sens_id1<<8) | sens_id2
print "id",sens_id

t1_d2= data_new[2]
t1_d3= data_new[3]
print(t1_d2)

t2_d4= data_new[4]
t2_d5= data_new[5]
print(t2_d4)

incliX_d6=data_new[6]
incliX_d7=data_new[7]
print('incli',incliX_d6) 

incliY_d8=data_new[8]
incliY_d9=data_new[9]


incliZ_d10=data_new[10]
incliZ_d11=data_new[11]






# temperature 1

t1= twos_comp(t1_d2,8)+0.01*t1_d3
print('t1',t1)

# temperature 2
t2=23+twos_comp(t2_d4,8)*0.5 
print('t2',t2)

############################

###############################
#            MSB|LSB
################################
#inclination XYZ
print "incli values from payload"
print incliX_d6,incliX_d7
print incliY_d8,incliY_d9
print incliZ_d10,incliZ_d11

incliX=twos_comp(incliX_d6,8)<<8 | incliX_d7

incliY=twos_comp(incliY_d8,8)<<8 | incliY_d9

incliZ=twos_comp(incliZ_d10,8)<<8 | incliZ_d11

print "2s compliment"

print twos_comp(incliX_d6,8)
print twos_comp(incliY_d8,8)
print twos_comp(incliZ_d10,8)



print "after 2's compliment and bitshift"
print(incliX)
print(incliY)
print(incliZ)

incliX=incliX/16384.0
incliX="{0:.2f}".format(incliX)

incliY=incliY/16384.0
incliY="{0:.2f}".format(incliY)

incliZ=incliZ/16384.0
incliZ="{0:.2f}".format(incliZ)

print "after division with constant and rounded to 4 decimals"


incliX=float(incliX)
incliY=float(incliY)
incliZ=float(incliZ)

print(incliX)
print(incliY)
print(incliZ)

print type(incliX)
print type(incliY)
print type(incliZ)

X=np.arccos(incliX)*(180/np.pi)
X="{0:.2f}".format(X)

Y=np.arccos(incliY)*(180/np.pi)
Y="{0:.2f}".format(Y)

Z=np.arccos(incliZ)*(180/np.pi)
Z="{0:.2f}".format(Z)

print("x",X)
print("y",Y)
print("z",Z)


##############################################
#                 LSB|MSB
##############################################

incliX_=twos_comp(incliX_d7,8)<<8 | incliX_d6
incliY_=twos_comp(incliY_d9,8)<<8 | incliY_d8
incliZ_=twos_comp(incliZ_d10,8)<<8 | incliZ_d11

print "2s compliment"

print twos_comp(incliX_d7,8)
print twos_comp(incliY_d9,8)
print twos_comp(incliZ_d10,8)



print "after 2's compliment and bitshift"

print(incliX_)
print(incliY_)
print(incliZ_)


incliX_=incliX_/16384.0
incliX_="{0:.4f}".format(incliX_)

incliY_=incliY_/16384.0
incliY_="{0:.4f}".format(incliY_)

incliZ_=incliZ_/16384.0
incliZ_="{0:.4f}".format(incliZ_)

incliX_=float(incliX_)
incliY_=float(incliY_)
incliZ_=float(incliZ_)
print "after division with constant and rounded to 4 decimals"

print(incliX_)
print(incliY_)
print(incliZ_)

if incliZ_ >=1:
    incliZ_=1
elif incliZ_ <=-1:
    incliZ_= -1  

X_=np.arccos(incliX_)*(180/np.pi)
X_="{0:.4f}".format(X_)

Y_=np.arccos(incliY_)*(180/np.pi)
Y_="{0:.4f}".format(Y_)

Z_=np.arccos(incliZ_)*(180/np.pi)
Z_="{0:.4f}".format(Z_)

print(X_)
print(Y_)
print(Z_)













"""
usefuldata!!!!!!!!!!


notifHealthReport
00-17-0d-00-00-59-06-2c {'Device': {'batteryVoltage': 2741, 'temperature': 20, 'numRxLost': 0, 'numTxFail': 0, 'queueOcc': 33,
 'charge': 99, 'numRxOk': 0, 'numTxOk': 92, 'badLinkSlot': 0, 'numMacDropped': 0, 'badLinkOffset': 0, 'numTxBad': 0, 'badLinkFrameId': 0}}

{'Device': {'batteryVoltage': 2741, 'temperature': 20, 'numRxLost': 0, 'numTxFail': 0, 'queueOcc': 33, 'charge': 99, 'numRxOk': 0, 
'numTxOk': 92, 'badLinkSlot': 0, 'numMacDropped': 0, 'badLinkOffset': 0, 'numTxBad': 0, 'badLinkFrameId': 0}}

voltage 2
INSERT INTO health_report_table (`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_batt_voltage`,`hr_packetloss`) VALUES (%s,%s,%s,%s,%s) 
['00-17-0d-00-00-59-06-2c', '2017-08-20  20:36:59 ', 1503254219256, 2.741, 0]


notifHealthReport
00-17-0d-00-00-59-06-2c {'Neighbors': {'neighbors': [{'neighborFlag': 0, 'neighborId': 1, 'numTxFailures': 1, 'rssi': -52, 
'numTxPackets': 93, 'numRxPackets': 1}], 'numItems': 1}}

{'Neighbors': {'neighbors': [{'neighborFlag': 0, 'neighborId': 1, 'numTxFailures': 1, 'rssi': -52, 'numTxPackets': 93,
 'numRxPackets': 1}], 'numItems': 1}}
[-52]

signal strength:  -52.0
INSERT INTO health_report_table (`hr_macid`,`hr_timeStamp`,`hr_epochStamp`,`hr_avg_rssi`) VALUES (%s,%s,%s,%s)
 ['00-17-0d-00-00-59-06-2c', '2017-08-20  20:44:29 ', 1503254669845, -52.0]


 """