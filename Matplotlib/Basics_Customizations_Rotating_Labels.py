import matplotlib.pyplot as plt
import numpy as np
import urllib
import matplotlib.dates as mdates

def bytesdate2num(fmt, encoding = 'utf-8'):
    strconverter = mdates.strpdate2num(fmt);
    def bytesconverter(b):
        s = b.decode(encoding)
        return strconverter(s)
    return bytesconverter

def graph_data(stock):

    fig = plt.figure()
    ax1 = plt.subplot2grid((1,1),(0,0))

    stock_price_url = 'http://chartapi.finance.yahoo.com/instrument/1.0/' +stock+ '/chartdata;type=quote;range=1y/csv'
    source_code = urllib.urlopen(stock_price_url).read().decode()

    stock_data = []
    split_source = source_code.split('\n')

    for line in split_source:
        split_line = line.split(',')
        if len(split_line) == 6:
            print split_line
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
    ax1.plot_date(date,closep,'-',label = 'Price')

    #since the names in the x label are overlapping
    #so we will tilt these labels by 45 counterclockwise
    for label in ax1.xaxis.get_ticklabels():
        label.set_rotation(45)

    ax1.grid(True,color = 'g',linestyle = 'solid',linewidth = 2)

    plt.xlabel('x')
    plt.ylabel('y')
    plt.legend()
    #use dto adjust the location of plot on screen....here 0 means leftmost or bottommost
    #and 1 means right most or top most of the screen
    #hspace and wspace are used for padding space between various subplots
    plt.subplots_adjust(left = 0.09,bottom = 0.18,right = 0.94,wspace = 0.2,hspace = 0)

    plt.show()

#in the arguments of subplot2grid the
#first tuple is the shape/geometry of the plot and (1,1) is the max size
#second pair or tuple is the starting point of the plot in the grid form......Note that
#the upper left corner is (0,0)

#rowspan and colspan are used to assign  column space and row space to the plot
#if rowspan = 3 then full row/whole plot heightwise is assigned
#if colspan = 3 then full column/whole plot widthwise is assigned
#to the subplot axi


'''
ax1 = plt.subplot2grid((3,3),(0,0),colspan = 3,rowspan = 1)
ax2 = plt.subplot2grid((3,3),(1,0),colspan = 2)
ax3 = plt.subplot2grid((3,3),(1,2),rowspan = 2)
ax4 = plt.subplot2grid((3,3),(2,0),colspan = 1)
ax5 = plt.subplot2grid((3,3),(2,1),colspan = 1)
plt.show()
'''
graph_data('TSLA')