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

    stock_price_url = 'http://chartapi.finance.yahoo.com/instrument/1.0/'+stock+'/chartdata;type=quote;range=10y/csv'
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

    #In order to mark the label for the gains and losses we mark an empty plot
    ax1.plot([],[],label = 'Gain',color = 'g',alpha = 0.5,linewidth = 5)
    ax1.plot([],[],label = 'Loss',color = 'r',alpha = 0.5,linewidth = 5)

    #fill is used to fill the plot between certain values under the curve
    #ax1.fill_between(date,closep,0)---->fills all of the plot since each value for xticks is always +ve.......
    # by default alpha value here is 1
    #The 3rd argument is very important........it fills the graph upwards if the value at that point is more than the
    #value specified at that point.
    #if the value is less than we get downward fill at that point

    #suppose we bought the EBAY share at the starting and now we would like to see when at all points we were in
    #profit-->we will choose 3rd argument as closep of 1st day

    #if fill is upward then we are in profit otherwise we are in loss

    #ax1.fill_between(date,closep,closep[0],alpha = 0.2)

    #profit days:
    ax1.fill_between(date,closep,closep[0],where = (closep > closep[0]),facecolor = 'g',alpha = 0.4)
    #loss days
    ax1.fill_between(date,closep,closep[0],where = (closep < closep[0]),facecolor = 'r',alpha = 0.4)

    for label in ax1.xaxis.get_ticklabels():
        label.set_rotation(45)
    ax1.grid(True)#, color = 'g',linestyle = 'solid',linewidth = 2)
    ax1.xaxis.label.set_color('c')
    ax1.yaxis.label.set_color('g')
    #yticks are markings on the y-axis
    #we can set the yticks in the plot as follows:
    ax1.set_yticks([0,10,20,30,40,50,60])

    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()
    plt.title('EBAY')

    plt.subplots_adjust(left = 0.09,bottom = 0.18,right = 0.94,wspace = 0.2,hspace = 0)
    plt.show()

graph_data('ebay')