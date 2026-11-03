import json
a=json.load(open('words.json'))['words']
W=lambda i:a[i]['start']
E=[]
def ev(i,fx,g,off=0,**args): E.append({'t':round(max(0,W(i)+off),2),'fx':fx,'gain':g,'args':args})
def at(t,fx,g,**args): E.append({'t':round(t,2),'fx':fx,'gain':g,'args':args})
ev(0,'drone',0.3,0,dur=12); ev(0,'whoosh',0.25)
ev(9,'beep',0.2,0.2); ev(12,'whoosh',0.2)
ev(24,'beep',0.2); ev(28,'ticktock',0.2,0,ticks=8,interval=0.4)
ev(37,'footsteps',0.25,0,steps=8,interval=0.55); ev(44,'shimmer',0.2)
ev(52,'impact',0.45); ev(52,'whoosh',0.25)
ev(65,'footsteps',0.3,0,steps=5,interval=0.3); ev(72,'whoosh',0.2); ev(77,'beep',0.15,0.2); ev(77,'beep',0.15,1.2)
ev(89,'whoosh',0.2); ev(91,'footsteps',0.25,0,steps=6,interval=0.5); ev(94,'beep',0.15)
ev(102,'footsteps',0.25,0,steps=8,interval=0.55); ev(110,'impact',0.4)
ev(113,'heartbeat',0.35,0,beats=6,bpm=84)
ev(118,'beep',0.2,0.1); ev(118,'beep',0.2,1.1); ev(124,'beep',0.2,0.1)
ev(127,'click',0.25,0.2); ev(127,'click',0.25,0.4); ev(127,'click',0.25,0.6)
ev(134,'impact',0.5); ev(134,'ticktock',0.2,0,ticks=6,interval=0.5)
ev(141,'drone',0.3,0,dur=8)
for i in (152,186,225,263): ev(i,'pop',0.35)
at(W(164)+2.55,'impact',0.45); at(W(164)+2.5,'buzz_flicker',0.25)
ev(169,'footsteps',0.2,0,steps=6,interval=0.6)
ev(174,'pop',0.35); ev(175,'pop',0.35); ev(177,'pop',0.35)
ev(178,'buzz_flicker',0.2); ev(193,'click',0.3,0.8); ev(193,'click',0.3,1.5); ev(193,'click',0.3,2.2)
ev(209,'footsteps',0.25,0,steps=7,interval=0.55)
ev(236,'heartbeat',0.3,0,beats=8,bpm=70)
ev(262,'impact',0.5); ev(262,'shimmer',0.3)
ev(275,'shimmer',0.2); ev(280,'buzz_flicker',0.2); ev(296,'buzz_flicker',0.2,0,dur=6)
ev(303,'drone',0.3,0,dur=10)
# SOS: 3 curtas, 3 longas, 3 curtas sincronizadas com a imagem
T=W(325); x=T
for grp,d in ((3,0.18),(3,0.5),(3,0.18)):
    for _ in range(grp):
        at(x,'beep',0.18,dur=d,f=880); x+=d+0.17
    x+=0.1
ev(333,'impact',0.55); ev(337,'whoosh',0.25)
ev(346,'footsteps',0.25,0,steps=8,interval=0.5); ev(352,'impact',0.4)
at(W(356)+2.0,'impact',0.3); at(W(369),'impact',0.4)
ev(376,'footsteps',0.35,0,steps=12,interval=0.2); ev(384,'creak',0.3)
ev(392,'shimmer',0.2); ev(404,'heartbeat',0.35,0,beats=8,bpm=66); at(W(404)+1.3,'impact',0.55)
E.sort(key=lambda e:e['t'])
json.dump({'music':{"root":52,"chord":[1,1.19,1.5],"level":0.1,"pulse":0.3,"fade_in":2.0,"fade_out":4.5},'duck':0.65,'sfx_scale':0.75,'sfx_duck':0.5,'events':E},open('events.json','w'))
print(len(E))
