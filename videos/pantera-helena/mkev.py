import json
W=json.load(open('words.json'))['words']
w=lambda i:W[i]['start']
E=[]
def ev(i,fx,g,off=0,**a): E.append({'t':round(max(0,w(i)+off),2),'fx':fx,'gain':g,'args':a})
def at(t,fx,g,**a): E.append({'t':round(max(0,t),2),'fx':fx,'gain':g,'args':a})
at(0.0,'drone',0.3,dur=10); at(1.5,'whoosh',0.3); ev(8,'whoosh',0.3); ev(12,'whoosh',0.2); ev(18,'impact',0.4); ev(18,'heartbeat',0.3,0.3,beats=6,bpm=84)
ev(19,'rumble',0.3,0,dur=1.6); ev(22,'shimmer',0.2); ev(27,'impact',0.3); ev(34,'drone',0.3,0,dur=6); ev(43,'click',0.2); ev(46,'click',0.2,0.5)
ev(52,'pop',0.25); ev(54,'pop',0.25); ev(56,'pop',0.25); ev(60,'ticktock',0.25,0,ticks=8,interval=0.4)
ev(72,'shimmer',0.2); ev(77,'drone',0.25,0,dur=4); ev(84,'rumble',0.25,0,dur=2); ev(90,'rumble',0.35,0,dur=3); ev(100,'drone',0.25,0,dur=4)
ev(109,'impact',0.3); ev(121,'rumble',0.3,0,dur=4); ev(128,'creak',0.3); ev(143,'drone',0.25,0,dur=5); ev(148,'rumble',0.25,0,dur=3)
ev(165,'drone',0.3,0,dur=8); ev(168,'impact',0.25,0.2); ev(186,'ticktock',0.3,0,ticks=8,interval=0.35); ev(192,'impact',0.4)
ev(198,'creak',0.3); ev(209,'drone',0.3,0,dur=4); ev(213,'click',0.35); ev(218,'footsteps',0.25,0,steps=5,interval=0.35)
ev(224,'heartbeat',0.35,0,beats=6,bpm=90); ev(234,'chime',0.25); ev(234,'heartbeat',0.35,0.2,beats=6,bpm=100)
ev(245,'click',0.35); ev(252,'creak',0.35); ev(252,'click',0.3,0.8); ev(272,'footsteps',0.25,0,steps=5,interval=0.38); ev(279,'creak',0.3)
at(80.0,'beep',0.25,dur=0.15,f=2200); ev(289,'beep',0.2,0,dur=0.12,f=2200); at(83.3,'impact',0.45)
for k in (84.9,85.5,86.1): at(k,'wood_knock',0.6); at(k,'impact',0.3)
ev(308,'heartbeat',0.4,0,beats=10,bpm=88); ev(319,'drone',0.4,0,dur=8); ev(326,'creak',0.4); ev(332,'impact',0.65); ev(332,'drone',0.4,0,dur=6)
json.dump({"music":{"root":49,"chord":[1,1.19,1.5],"level":0.1,"pulse":0.25,"fade_in":2.0,"fade_out":3.0},"duck":0.65,"sfx_scale":0.75,"sfx_duck":0.5,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'),indent=1)
print(len(E))
