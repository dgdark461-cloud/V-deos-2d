import json
W=json.load(open('words.json'))['words']
CH=[a for a,b in json.load(open('/tmp/chunks22.json'))]
E=[]
def ev(k,fx,g,off=0,**a): E.append({'t':round(max(0,W[CH[k]]['start']+off),2),'fx':fx,'gain':g,'args':a})
scare={0,12,17,22,37,40,53,56,74,85}
special={
 0:[('impact',0.26,0),('heartbeat',0.16,0.2,{'beats':3,'bpm':84})],
 1:[('shimmer',0.12,0)],2:[('drone',0.12,0,{'dur':4})],4:[('rain',0.05,0,{'dur':3})],
 5:[('ticktock',0.14,0,{'ticks':4,'interval':0.4})],6:[('murmur',0.06,0,{'dur':2})],
 10:[('heartbeat',0.16,0,{'beats':3,'bpm':84})],11:[('creak',0.12,0.2)],
 14:[('buzz_flicker',0.08,0)],16:[('footsteps',0.12,0,{'steps':4,'interval':0.35})],
 17:[('heartbeat',0.18,0.1,{'beats':3,'bpm':96})],19:[('rumble',0.14,0,{'dur':2})],
 23:[('click',0.14,0.9)],27:[('shimmer',0.1,0)],28:[('murmur',0.07,0,{'dur':2})],
 29:[('wood_knock',0.2,0.1)],30:[('creak',0.18,0.2)],31:[('rain',0.08,0,{'dur':2})],
 32:[('beep',0.1,0,{'dur':0.25,'f':880}),('beep',0.1,0.5,{'dur':0.25,'f':880})],
 35:[('murmur',0.06,0,{'dur':2})],38:[('whoosh',0.14,0.2)],41:[('click',0.2,0.3)],
 42:[('footsteps',0.14,0,{'steps':5,'interval':0.3})],44:[('click',0.1,0.36),('click',0.1,0.72)],
 46:[('heartbeat',0.18,0,{'beats':3,'bpm':100})],47:[('heartbeat',0.2,0,{'beats':3,'bpm':110})],
 48:[('beep',0.12,0,{'dur':0.3,'f':760}),('beep',0.12,0.55,{'dur':0.3,'f':760})],
 54:[('drone',0.14,0,{'dur':3})],56:[('rumble',0.16,0,{'dur':2})],57:[('whoosh',0.18,0.1)],
 58:[('click',0.2,0.1)],59:[('chime',0.12,0.1)],61:[('chime',0.1,0.2)],
 63:[('shimmer',0.14,0)],65:[('drone',0.12,0,{'dur':2})],66:[('rumble',0.1,0,{'dur':1.5})],
 67:[('shimmer',0.14,0)],68:[('beep',0.08,0.2,{'dur':0.15,'f':1200}),('beep',0.08,0.6,{'dur':0.15,'f':1200}),('beep',0.08,1.0,{'dur':0.15,'f':1200})],
 72:[('rumble',0.14,0.8,{'dur':1.2})],77:[('creak',0.16,0.2)],79:[('drone',0.14,0,{'dur':2})],
 82:[('buzz_flicker',0.06,0)],85:[('scream_echo',0.1,0.05)],86:[('shimmer',0.12,0)],
 88:[('shimmer',0.1,0)],89:[('chime',0.14,0.1)],
}
for k in range(len(CH)):
    if k in scare: ev(k,'impact',0.2 if k else 0.26,0)
    elif k not in (0,): ev(k,'whoosh',0.085,-0.04)
    for it in special.get(k,[]):
        fx,g,off=it[:3]; a=it[3] if len(it)>3 else {}
        ev(k,fx,g,off,**a)
json.dump({"music":{"root":45,"chord":[1,1.19,1.5],"level":0.13,"pulse":0.1,"fade_in":1.5,"fade_out":3.0},"duck":0.6,"sfx_scale":0.8,"sfx_duck":0.45,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'))
print(len(E))
