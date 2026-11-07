import json
W=json.load(open('words.json'))['words']
w=lambda i:W[i]['start']
E=[]
def ev(i,fx,g,off=0,**a): E.append({'t':round(max(0,w(i)+off),2),'fx':fx,'gain':g,'args':a})
ev(0,'shimmer',0.16,0.3); ev(10,'impact',0.22,0.6); ev(20,'chime',0.14,0.2); ev(20,'click',0.1,1.2); ev(20,'click',0.1,2.4)
ev(30,'whoosh',0.12); ev(35,'footsteps',0.14,0,steps=6,interval=0.5); ev(41,'impact',0.2,0.1)
ev(41,'footsteps',0.14,0,steps=14,interval=0.5); ev(54,'chime',0.14,0.3); ev(62,'murmur',0.08,0,dur=6); ev(62,'click',0.12,2.0); ev(62,'click',0.12,4.0)
ev(72,'rumble',0.2,0,dur=3); ev(76,'whoosh',0.22,0.2); ev(78,'impact',0.2,0.1); ev(78,'rain',0.1,0,dur=3)
ev(83,'click',0.1); ev(88,'footsteps',0.16,0,steps=8,interval=0.25); ev(88,'rain',0.1,0,dur=5)
ev(98,'shimmer',0.14); ev(103,'shimmer',0.16); ev(112,'whoosh',0.1); ev(116,'rumble',0.12,0,dur=3); ev(120,'chime',0.14,0.4)
ev(126,'whoosh',0.14); ev(126,'murmur',0.1,0.5,dur=7); ev(138,'drone',0.1,0,dur=7); ev(145,'click',0.12,0.5); ev(150,'click',0.1)
ev(158,'whoosh',0.1); ev(171,'impact',0.14,0.2); ev(177,'heartbeat',0.16,0,beats=8,bpm=70); ev(185,'impact',0.22,1.2)
ev(194,'ticktock',0.16,0,ticks=14,interval=0.5); ev(205,'whoosh',0.12); ev(216,'whoosh',0.14); ev(224,'shimmer',0.14); ev(233,'click',0.12,1.2); ev(233,'click',0.12,4.5)
ev(242,'impact',0.24,1.0); ev(249,'chime',0.16,0.3); ev(257,'click',0.12,0.5); ev(263,'chime',0.2,0.5); ev(263,'shimmer',0.14,0.5)
ev(270,'murmur',0.1,0,dur=8); ev(280,'shimmer',0.14); ev(288,'whoosh',0.16); ev(288,'buzz_flicker',0.06,0.5); ev(298,'click',0.14,2.5); ev(298,'chime',0.14,2.6)
ev(308,'whoosh',0.12); ev(308,'impact',0.16,3.0); ev(319,'click',0.1); ev(319,'impact',0.14,0.8); ev(324,'whoosh',0.12); ev(335,'whoosh',0.14); ev(346,'click',0.12); ev(346,'impact',0.14,2.0)
ev(356,'shimmer',0.14,1.0); ev(370,'click',0.1,0.7); ev(370,'click',0.1,1.4); ev(370,'click',0.1,2.1); ev(380,'drone',0.1,0,dur=8); ev(390,'chime',0.14,0.2); ev(397,'whoosh',0.15,1.4)
json.dump({"music":{"root":60,"chord":[1,1.26,1.5],"level":0.12,"pulse":0.12,"fade_in":2.0,"fade_out":3.0},"duck":0.65,"sfx_scale":0.7,"sfx_duck":0.5,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'))
print(len(E))
