import json
import os
import csv
import StringIO
import nltk
import time
import operator

with open('reviewYearData.json') as data_file:    
    data = json.load(data_file)

formatted = []
for d in data:
        print d[5]