import matplotlib.pyplot as plt

x = [1,2,3,5] #list for the x axis values
y = [4,5,8,10] #list for the y axis values

x2 = [4,6,8]
y2 = [1,2,3]

plt.plot(x,y,label = 'first line',linewidth = 2)
plt.plot(x2,y2,label = 'second line',linewidth = 2)
#line width is used to assign the width to the plot line in the graph
#by default it is 1

plt.legend()

plt.show()
