import json
W=json.load(open('words.json'))['words']
w=lambda i:W[i]['start']
E=[]
def ev(i,fx,g,off=0,**a): E.append({'t':round(max(0,w(i)+off),2),'fx':fx,'gain':g,'args':a})
def at(t,fx,g,**a): E.append({'t':round(max(0,t),2),'fx':fx,'gain':g,'args':a})
ev(0,'whoosh',0.2); ev(6,'whoosh',0.12); ev(10,'click',0.2,1.2); ev(18,'click',0.1); ev(18,'click',0.1,0.5)
ev(24,'footsteps',0.15,0,steps=6,interval=0.45); ev(29,'whoosh',0.14); ev(35,'chime',0.15,0.2); ev(40,'shimmer',0.15)
ev(50,'shimmer',0.15); ev(56,'impact',0.25); ev(62,'footsteps',0.2,0,steps=6,interval=0.3); ev(67,'footsteps',0.12,0,steps=4,interval=0.4); ev(67,'impact',0.3,1.6)
ev(73,'click',0.15); ev(78,'ticktock',0.25,0,ticks=14,interval=0.4); ev(84,'click',0.2); ev(84,'chime',0.15,1.0); ev(88,'click',0.2); ev(88,'chime',0.15,1.0)
ev(94,'whoosh',0.15); ev(94,'drone',0.12,0,dur=8)
for k in (0.3,0.65,1.0,1.35,1.7): ev(103,'click',0.12,k)
ev(103,'impact',0.4,3.2); ev(113,'whoosh',0.2,1.4); ev(120,'click',0.12); ev(129,'whoosh',0.15)
ev(135,'click',0.12,0.5); ev(140,'click',0.15,3.0); ev(148,'shimmer',0.2); ev(156,'chime',0.15,0.6)
ev(164,'shimmer',0.2,1.0); ev(177,'whoosh',0.15); ev(177,'chime',0.15,0.3)
ev(188,'click',0.1); ev(194,'click',0.1); ev(200,'whoosh',0.12); ev(208,'chime',0.18,0.3); ev(217,'chime',0.12,0.4); ev(217,'chime',0.12,1.1)
ev(225,'chime',0.12,0.6); ev(225,'chime',0.12,1.5); ev(233,'whoosh',0.1,0.8); ev(233,'whoosh',0.1,2.2)
ev(242,'murmur',0.12,0,dur=5); ev(251,'shimmer',0.22,1.9); ev(259,'rumble',0.12,0,dur=3); ev(270,'footsteps',0.15,0,steps=6,interval=0.5)
ev(280,'shimmer',0.15,1.0); ev(288,'impact',0.25,1.2); ev(295,'footsteps',0.15,0,steps=10,interval=0.45)
ev(305,'click',0.1); ev(310,'click',0.1); ev(321,'whoosh',0.2); ev(327,'click',0.12,0.5); ev(336,'impact',0.2); ev(341,'drone',0.15,0,dur=5)
ev(349,'heartbeat',0.12,0,beats=4,bpm=70); ev(356,'murmur',0.1,0,dur=6); ev(364,'click',0.1); ev(372,'whoosh',0.15); ev(378,'chime',0.2)
ev(382,'shimmer',0.15,1.0); ev(392,'shimmer',0.2,1.6); ev(392,'chime',0.18,3.2)
json.dump({"music":{"root":65,"chord":[1,1.26,1.5],"level":0.12,"pulse":0.12,"fade_in":2.0,"fade_out":3.0},"duck":0.65,"sfx_scale":0.7,"sfx_duck":0.5,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'))
print(len(E))
