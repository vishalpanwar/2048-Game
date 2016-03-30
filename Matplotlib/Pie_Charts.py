import matplotlib.pyplot as plt

#pie charts are similar to stack plots but instead of showing over time like stack plot does
#this shows a slice of time

days = [1,2,3,4,5]

sleeping = [7,8,6,8,9]
eating = [5,2,1,2,2]
working = [7,8,9,11,5]
playing = [5,6,8,3,8]

slices = [sum(sleeping),sum(eating),sum(working),sum(playing)]
activities = ['sleeping','eating','working','playing']
cols = ['c','m','b','r']

plt.pie(slices,
        labels = activities,
        colors = cols,
        startangle = 90,
        shadow = True,
        explode = (0,0.1,0,0),
        autopct = '%1.1f%%'
        )
#startangle signifies the starting angle(by default 0)
#rest activities are plotted counterclockwise
#shadow = True : adds shadow to the pie chart
#explode is used to draw attention to a particular activity by pulling or exploding it out of the pie chart (by default it is 0)
#autopct is use dto assign percentage value to each sice in the pie chart

plt.title('Pie Chart')
plt.show()