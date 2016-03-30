import matplotlib.pyplot as plt

#scatter plot is generally used to show correlation(some sort of relation between two typwes of variables).

x = [1,2,3,4,5,6,7,8]
y = [5,6,4,2,3,2,3,9]

plt.scatter(x,y,label = 'skitscatter',color = 'k',marker = '*',s = 100)
#k(0000) is for balck color
#marker denotes the shape of scatter points
#markersize denotes the size of marker(by default 10)

plt.xlabel('x')
plt.ylabel('y')
plt.title('Scatter Plot')
plt.legend()
plt.show()