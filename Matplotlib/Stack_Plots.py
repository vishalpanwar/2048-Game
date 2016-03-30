import matplotlib.pyplot as plt

#stack plots is used to show the relative % of something in the whole or the size of use
#we will have a wholistic number and inside it sections of samll numbers that comprise it

days = [1,2,3,4,5]

sleeping = [7,8,6,8,9]
eating = [5,2,1,2,2]
working = [7,8,9,11,5]
playing = [5,6,8,3,8]

#days will be our x axis element and all others will be our y elements
plt.stackplot(days,sleeping,working,eating,playing,colors = ['m','c','r','k'],labels = ['sleeping','working','eating','playing'])

plt.xlabel('x')
plt.ylabel('y')
plt.title('Stack Plot')
plt.legend()
plt.show()