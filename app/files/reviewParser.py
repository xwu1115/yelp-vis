import json
import os
import csv
import StringIO
import nltk
import time
import operator

fp= open('reviewData.json', 'w')

with open('review.json') as data_file:    
    data = json.load(data_file)

reviews = dict()

for d in data:
        business_id = d['business_id']
        if business_id in reviews:
                adj = reviews[business_id]
        else:
                adj = []
        tokens = nltk.word_tokenize(d['text'])
        tagged = nltk.pos_tag(tokens)
        adj.extend ([word for word,pos in tagged \
        #if (pos == 'NN' or pos == 'NNP' or pos == 'NNS' or pos == 'NNPS')]
            if (pos == 'JJ')])
    #print adj
        reviews[business_id] = adj
tmp = dict()
for key, value in reviews.iteritems():
        adj = value
        map = dict()
        for w in adj:
            if w in map:
                map[w] += 1
            else:
                map[w] = 1
        sorted_map = sorted(map.items(), key=operator.itemgetter(1))
        sorted_map = sorted_map[-10:]
        tmp[key] = sorted_map
json.dump(tmp, fp, indent=4)
fp.close()