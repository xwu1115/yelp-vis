import json
import os
import csv
import StringIO
import nltk
import time
import operator

fp= open('reviewData1.json', 'w')

with open('review.json') as data_file:    
    data = json.load(data_file)

reviewsYear = dict()
for d in data:
        tmp = int(d['date'][0:4]) + 0
        if tmp <=2009:
            continue
        year = d['date'][0:7]
        score = d['stars']
        if year in reviewsYear:
            if score in reviewsYear[year]:
                reviewsYear[year][score]+=1
            else:
                reviewsYear[year][score]=1
        else:
            y = dict()
            y[score] = 1
            reviewsYear[year] = y
print reviewsYear

formatted = []
for y in reviewsYear:
    print y
    for s in reviewsYear[y]:
        d = dict()
        d['time'] = y
        d['score'] = s
        d['num'] = reviewsYear[y][s]
        print reviewsYear[y][s]
        formatted.append(d)
formatted.sort()
print formatted
json.dump(formatted, fp, indent=2)
fp.close()