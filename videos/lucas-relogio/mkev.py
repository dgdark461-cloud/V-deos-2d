import json
W=json.load(open('words.json'))['words']
w=lambda i:W[i]['start']
E=[]
def ev(i,fx,g,off=0,**a): E.append({'t':round(max(0,w(i)+off),2),'fx':fx,'gain':g,'args':a})
def at(t,fx,g,**a): E.append({'t':round(max(0,t),2),'fx':fx,'gain':g,'args':a})
at(0.0,'impact',0.4); at(0.0,'drone',0.3,dur=12); at(0.15,'whoosh',0.3)
ev(6,'whoosh',0.2); ev(12,'ticktock',0.2,0,ticks=6,interval=0.5); ev(18,'shimmer',0.2); ev(22,'heartbeat',0.25,0,beats=5,bpm=70); ev(30,'whoosh',0.25)
ev(35,'drone',0.25,0,dur=6); ev(41,'click',0.2); ev(43,'click',0.2); ev(45,'click',0.2); ev(47,'click',0.2); ev(54,'rumble',0.2,0,dur=3)
ev(60,'beep',0.2,0,dur=0.12,f=1500); ev(66,'beep',0.15,0,dur=0.1,f=1500); ev(72,'ticktock',0.25,0,ticks=6,interval=0.45); ev(78,'impact',0.35); ev(84,'drone',0.3,0,dur=8)
ev(90,'drone',0.2,0,dur=5); ev(120,'click',0.2); ev(138,'heartbeat',0.3,0,beats=6,bpm=84); ev(144,'buzz_flicker',0.15,0,dur=0.8); ev(150,'beep',0.2,0,dur=0.12,f=1500)
ev(156,'impact',0.35); ev(168,'click',0.25); ev(174,'drone',0.25,0,dur=6); ev(180,'buzz_flicker',0.2,0,dur=1.5); ev(186,'shimmer',0.2); ev(192,'ticktock',0.25,0,ticks=8,interval=0.4)
ev(198,'drone',0.25,0,dur=5); ev(210,'heartbeat',0.35,0,beats=7,bpm=96); ev(216,'impact',0.5); ev(222,'beep',0.25,0,dur=0.12,f=1500); ev(228,'rumble',0.25,0,dur=3)
for k in (0.1,0.55,1.0): ev(240,'wood_knock',0.5,k)
ev(252,'beep',0.2,0,dur=0.12,f=1500)
for k in (0.3,0.9,1.5): ev(258,'wood_knock',0.55,k)
for k in (0.2,0.8): ev(270,'wood_knock',0.55,k)
ev(276,'beep',0.15,0,dur=0.1,f=1000); ev(288,'buzz_flicker',0.2,0,dur=1.0); ev(294,'impact',0.45); ev(300,'creak',0.35); ev(306,'shimmer',0.2)
ev(330,'beep',0.2,0,dur=0.12,f=1500); ev(336,'heartbeat',0.4,0,beats=8,bpm=88); ev(342,'drone',0.3,0,dur=6); ev(354,'heartbeat',0.4,0,beats=8,bpm=100)
ev(360,'rumble',0.35,0,dur=4); ev(366,'murmur',0.12,0,dur=6); ev(372,'impact',0.35); ev(378,'impact',0.4); ev(384,'beep',0.25,0,dur=0.12,f=1500); ev(388,'impact',0.55); ev(388,'drone',0.4,0,dur=4)
json.dump({"music":{"root":49,"chord":[1,1.19,1.5],"level":0.1,"pulse":0.25,"fade_in":2.0,"fade_out":3.0},"duck":0.65,"sfx_scale":0.7,"sfx_duck":0.5,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'),indent=1)
print(len(E))
