import numpy as np
import time
import datetime as dt

#returns current unixtime
def get_unixtime():
    return time.time()

#returns current time in datetime format
def get_datetime():
    return dt.datetime.fromtimestamp(get_unixtime())

#vectorize a given unix time in datetime format
def vectorizetime(date):
    dateconv = np.vectorize(dt.datetime.fromtimestamp)
    return dateconv(date)

print(vectorizetime(1457706845))

