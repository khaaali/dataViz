import time,datetime 
from datetime import datetime
def epoch():
    return int(round(time.time() * 1000))
def timeStamp():
    return time.strftime("%Y-%m-%d  %H:%M:%S ", time.gmtime()) 

def currenttime():
    return str(datetime.now())
    

while True:
	time.sleep(2)
	print epoch(),currenttime(),timeStamp
