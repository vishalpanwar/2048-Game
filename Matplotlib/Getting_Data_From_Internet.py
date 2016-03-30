import matplotlib.pyplot as plt
import numpy as np
import urllib
import matplotlib.dates as mdates

#matplotlib has its own date converter or date handler as mdates


#urllib module provides a high-level interface for fetching datya across the world wide web. In particular,
#the urlopen() function is similar to the built-in function open(), but accepts Universal Resource Locators (URLs)
#instead of filenames.

#Yahoo finance url:
#upto stock is the finance api
#stock: the stock that we input the dynammic stock
#the last part is the chart data----> 10y implies that 10 years of data that we want
#'http://chartapi.finance.yahoo.com/instrument/1.0/' +stock+ '/chartdata;type=quote;range=10y/csv'?

#we will be using yahoo finances api to get stock prices

#Unix Time : no. of seconds after 1st January 1970
#matplotlib does not use UNIX time


#bytesdate2num change the standard format time in YYYYMMDD to matplotlib.date time which is
#in the range of approx 73000
def bytesdate2num(fmt, encoding = 'utf-8'):
    strconverter = mdates.strpdate2num(fmt);
    def bytesconverter(b):
        s = b.decode(encoding)
        return strconverter(s)
    return bytesconverter

def graph_data(stock):
    stock_price_url = 'http://chartapi.finance.yahoo.com/instrument/1.0/' +stock+ '/chartdata;type=quote;range=5y/csv'
    source_code = urllib.urlopen(stock_price_url).read().decode()

    stock_data = []
    split_source = source_code.split('\n')


    #if you open the url and use TSLA instead of stock, you will see that the stcok values have 6 values
    #each separated by comma give as
    #value:Date,close,high,low,open,volume
    #Now we want to avoid all the data except the stock values......so we make an observation that all the stock value
    #contains 6 values separated by comma. Except this only one more line has this same feature.
    #So we try to filter that out accordingly :D

    #please note that the split keyword always converts a string to a list

    for line in split_source:
        split_line = line.split(',')
        if len(split_line) == 6:
            print split_line

            #we want only stock data so we will ignore the irrelevant data which starts with values and
            #labels with length 6

            if 'values' not in line and 'labels' not in line:
                stock_data.append(line)

    date, closep, highp, lowp, openp, volumep = np.loadtxt(stock_data,
                                                           delimiter = ',',
                                                           unpack = True,
                                                           # %Y = full year. 2016
                                                           # %y = partial year 16
                                                           # %m = number month
                                                           # %d = number day
                                                           # %H = hours
                                                           # %M = minutes
                                                           # %S = seconds
                                                           # %m-%d-%Y
                                                           converters={0: bytesdate2num('%Y%m%d')}
                                                           )

    plt.plot_date(date,closep,label = 'Price')

    plt.xlabel('x')
    plt.ylabel('y')
    plt.legend()
    plt.show()

graph_data('TSLA')