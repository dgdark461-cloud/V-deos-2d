import json
a=json.load(open('words.json'))['words']
W=lambda i:a[i]['start']
E=[]
def ev(i,fx,g,off=0): E.append({'t':round(W(i)+off,2),'fx':fx,'gain':g,'args':{}})
ev(0,'drone',0.3); ev(7,'whoosh',0.25); ev(16,'click',0.3); ev(30,'impact',0.4); ev(54,'ticktock',0.3); ev(54,'ticktock',0.3,0.6)
for k in range(3): ev(63,'click',0.55,k*0.6)
for i in (99,101,103): ev(i,'click',0.5)
ev(100,'click',0.4); ev(102,'click',0.4)
ev(111,'footsteps',0.3); ev(157,'ticktock',0.3); ev(157,'ticktock',0.3,0.5); ev(163,'footsteps',0.3)
for k in range(3): ev(177,'click',0.5,k*0.6)
for o in (0,0.25): ev(185,'wood_knock',0.7,o)
ev(191,'footsteps',0.25); ev(194,'creak',0.5); ev(201,'shimmer',0.35)
ev(234,'shimmer',0.35)
for k in range(3): ev(275,'click',0.45,k*0.5)
ev(278,'chord',0.35)
for k in range(3): ev(285,'click',0.45,k*0.6)
ev(307,'shimmer',0.3); ev(352,'creak',0.4); ev(372,'shimmer',0.5); ev(377,'wood_knock',0.7); ev(377,'wood_knock',0.7,0.25); ev(404,'chord',0.3)
E.sort(key=lambda e:e['t'])
json.dump({'music':{"root":65,"chord":[1,1.25,1.5],"level":0.11,"pulse":0,"fade_in":1.5,"fade_out":3.5},'events':E},open('events.json','w'))
print(len(E))
