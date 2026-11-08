import json
W=json.load(open('words.json'))['words']
CH=[a for a,b in json.load(open('/tmp/chunks23.json'))]
E=[]
def ev(k,fx,g,off=0,**a): E.append({'t':round(max(0,W[CH[k]]['start']+off),2),'fx':fx,'gain':g,'args':a})
scare={0,22,26,33,37,41,47,53,56,57,58,77,83,85,89}
sp={
 0:[('heartbeat',0.14,0.3,{'beats':3,'bpm':90})],1:[('shimmer',0.1,0)],2:[('click',0.16,1.0)],4:[('chime',0.08,0)],
 7:[('click',0.1,0)],8:[('shimmer',0.14,0)],9:[('ticktock',0.15,0,{'ticks':4,'interval':0.35})],
 12:[('click',0.12,0.3)],13:[('drone',0.12,0,{'dur':3})],19:[('drone',0.1,0,{'dur':2})],21:[('murmur',0.07,0,{'dur':2})],
 24:[('rumble',0.1,0,{'dur':2})],25:[('click',0.12,0.1),('click',0.12,0.5)],26:[('drone',0.14,0.3,{'dur':4})],
 29:[('click',0.1,0)],30:[('click',0.18,0.9)],31:[('whoosh',0.16,0.1)],33:[('wood_knock',0.18,0.1)],
 37:[('wood_knock',0.22,0.1)],38:[('drone',0.14,0,{'dur':3})],39:[('ticktock',0.14,0,{'ticks':4,'interval':0.4})],
 40:[('footsteps',0.16,0,{'steps':4,'interval':0.42})],42:[('creak',0.14,0.2)],43:[('rumble',0.12,0,{'dur':2})],44:[('creak',0.1,0.3)],
 47:[('wood_knock',0.2,0.1),('wood_knock',0.2,0.65),('wood_knock',0.2,1.2)],49:[('murmur',0.08,0,{'dur':2})],50:[('murmur',0.08,0,{'dur':2})],
 54:[('murmur',0.09,0,{'dur':2})],55:[('rumble',0.1,0,{'dur':1.5})],59:[('shimmer',0.1,0)],
 56:[('scream_echo',0.08,0.05)],63:[('ticktock',0.14,0,{'ticks':5,'interval':0.3})],64:[('footsteps',0.14,0,{'steps':4,'interval':0.4})],
 65:[('footsteps',0.14,0,{'steps':4,'interval':0.4})],66:[('creak',0.12,0.5)],67:[('chime',0.2,0.1),('shimmer',0.1,0.1)],
 68:[('chime',0.1,0)],69:[('creak',0.1,0.2)],72:[('creak',0.1,0.3)],75:[('click',0.1,0.3),('click',0.1,0.6),('click',0.1,0.9),('click',0.1,1.2)],
 79:[('drone',0.12,0,{'dur':3})],81:[('murmur',0.09,0,{'dur':2})],82:[('rumble',0.1,0,{'dur':2})],83:[('rumble',0.14,0.2,{'dur':1.5})],
 84:[('drone',0.1,0,{'dur':2})],87:[('chime',0.14,0.1),('click',0.12,0.9)],90:[('heartbeat',0.16,0,{'beats':2,'bpm':70})],
}
for k in range(len(CH)):
    if k in scare: ev(k,'impact',0.2 if k else 0.24,0)
    elif k!=0: ev(k,'whoosh',0.085,-0.04)
    for it in sp.get(k,[]):
        fx,g,off=it[:3]; a=it[3] if len(it)>3 else {}
        ev(k,fx,g,off,**a)
json.dump({"music":{"root":43,"chord":[1,1.19,1.5],"level":0.13,"pulse":0.1,"fade_in":1.5,"fade_out":3.0},"duck":0.6,"sfx_scale":0.8,"sfx_duck":0.45,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'))
print(len(E))
