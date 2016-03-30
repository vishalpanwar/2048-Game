import matplotlib.dates as mdates
import numpy as np

def bytesdate2num(fmt,encoding = 'utf-8'):
    print fmt
    strconverter = mdates.strpdate2num(fmt)
    print strconverter
    def bytesconverter(b):
        print b
        s = b.decode(encoding)
        print s
        print(strconverter(s))
        return strconverter(s)
    return bytesconverter

print(bytesdate2num('20160808'))
