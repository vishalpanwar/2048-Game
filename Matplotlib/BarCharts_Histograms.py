import matplotlib.pyplot as plt

'''
x = [2,4,6,8,10]
y = [1,4,5,2,8]

x2 = [1,3,4.5,5,6.5]
y2 = [6,5.5,7,1,9]

#thickness or width of bars will be just less than 1
#left edge of the bar is the actual point
plt.bar(x,y,label = 'first bar',color = 'r')#r is for red color
plt.bar(x2,y2,label = 'second bar',color = 'c')#c is for cyanide

'''

population_ages = [22,55,62,45,21,22,34,42,4,9,42,110,100,120,129.5,18,130,11,121,101,2.5,0.5]

ids = [x for x in range(len(population_ages))]

#plt.bar(ids,population_ages,label = 'population bar')
#this bar does not provide any necessary info like how many older prople do we have or
# how many retired people do we have.............so we use histogram that will show us a distribution

#bin :- box, elements that contains values.....here the allthe data will be consensed in the given bin values
#so here we will have only 14 bars
#10 implie 0 to 9 and so on
bins = [0,10,20,30,40,50,60,70,80,90,100,110,120,130]

#rwidth denotes the width oif each bar relative to a interval that we have taken in bin i.e. 10 here
#so 0.8 will mean 0.8 * 10 = 8 unit size width
plt.hist(population_ages,bins,histtype = 'bar',rwidth = 0.8,label = 'population histogram')

plt.xlabel('age group')
plt.ylabel('population')
plt.legend()

plt.show()
