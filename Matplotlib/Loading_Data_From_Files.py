import matplotlib.pyplot as plt

'''


#                                PART-1: As a csv file:

import csv

#we can use csv to open txt files and we can also use numpy to open csv files
#A CSV file is a comma separated values file, which allows data to be saved in a table structured format.
#Each line of the file is a data record. Each record consists of one or more fields, separated by commas.

x = []
y = []
z = []

#'with' keyword lets the file open until we are in it and once we get out of
#the 'with' loop this file is closed

with open('example.txt','r') as csvfile:
    plots = csv.reader(csvfile,delimiter = ',')

    #plots can be thought of as a list separated line by line
    #where each row is separated by commas

    for row in plots:
        x.append(int(row[0]))
        y.append(int(row[1]))
        z.append(int(row[2]))

plt.plot(x,y,label = 'xy loaded from file',linewidth = 5)
plt.plot(x,z,label = 'xz loaded from file',linewidth = 5)

'''


#                                    PART-2: Using NUMPY

import numpy as np

#returns a list where each list has 2 elements in it
#unpack means that we want to unpack that elements separated by the comma to x and then y
#if unpack is not set to true than instead of varables a full list will be assigned to x only
x, y, z = np.loadtxt('example.txt',delimiter = ',',unpack = True)
print x

plt.plot(x,y,label = 'xy loaded from file',linewidth = 5)
plt.plot(x,z,label = 'xz loaded from file',linewidth = 5)
plt.grid(True,color = 'g',linestyle = 'dashed')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Plot of Example.txt')
plt.legend()
plt.show()