import json
W=json.load(open('words.json'))['words']
CH=[a for a,b in json.load(open('/tmp/chunks24.json'))]
E=[]
def ev(k,fx,g,off=0,**a): E.append({'t':round(max(0,W[CH[k]]['start']+off),2),'fx':fx,'gain':g,'args':a})
scare={0,10,15,26,31,34,43,48,49,55,68}
sp={
 0:[('heartbeat',0.14,0.2,{'beats':3,'bpm':84})],1:[('shimmer',0.1,0)],2:[('click',0.08,0.2)],4:[('buzz_flicker',0.1,0.3)],
 5:[('footsteps',0.1,0,{'steps':3,'interval':0.4})],6:[('ticktock',0.14,0,{'ticks':4,'interval':0.35})],
 8:[('footsteps',0.14,0,{'steps':5,'interval':0.28})],9:[('click',0.12,0.4)],11:[('murmur',0.07,0,{'dur':2})],
 12:[('rumble',0.16,0,{'dur':1.7})],13:[('click',0.1,0.1),('click',0.1,0.4),('click',0.1,0.7)],14:[('murmur',0.1,0,{'dur':2}),('rumble',0.1,0.5,{'dur':1})],
 15:[('buzz_flicker',0.14,0),('drone',0.12,0.5,{'dur':3})],16:[('shimmer',0.08,0)],17:[('buzz_flicker',0.08,0)],
 18:[('murmur',0.07,0,{'dur':2})],19:[('chime',0.08,0.4)],21:[('drone',0.1,0,{'dur':2})],22:[('chime',0.1,0.1),('murmur',0.07,0.3,{'dur':1.2})],
 23:[('murmur',0.12,0,{'dur':1.2})],24:[('chime',0.1,0.1)],26:[('scream_echo',0.08,0.05)],27:[('footsteps',0.1,0,{'steps':3,'interval':0.4})],
 28:[('ticktock',0.12,0,{'ticks':3,'interval':0.4})],29:[('buzz_flicker',0.16,0)],30:[('buzz_flicker',0.14,0.2),('beep',0.1,0.9,{'dur':0.3,'f':440})],
 31:[('rumble',0.12,0,{'dur':1.2})],32:[('click',0.2,0.4),('buzz_flicker',0.14,0.5)],33:[('murmur',0.1,0,{'dur':1.4})],34:[('wood_knock',0.2,0.2),('wood_knock',0.2,0.7)],
 36:[('creak',0.1,0.1)],37:[('click',0.1,0.4),('click',0.1,0.7)],39:[('chime',0.1,0.1)],40:[('creak',0.1,0.2)],41:[('shimmer',0.1,0.2)],
 42:[('rumble',0.14,0,{'dur':1.4})],44:[('footsteps',0.14,0,{'steps':5,'interval':0.25})],45:[('footsteps',0.1,0,{'steps':4,'interval':0.3})],
 47:[('click',0.1,0.2),('click',0.1,0.5)],48:[('rumble',0.16,0.1,{'dur':1.2})],49:[('murmur',0.12,0,{'dur':1.4})],
 50:[('drone',0.1,0,{'dur':1.5})],53:[('rumble',0.14,0,{'dur':1.2})],54:[('click',0.2,0.5)],55:[('buzz_flicker',0.14,0),('chime',0.1,0.3)],
 56:[('murmur',0.12,0,{'dur':1.6})],58:[('rumble',0.14,0,{'dur':1.2})],59:[('creak',0.1,0.2)],60:[('murmur',0.09,0,{'dur':1.2})],
 61:[('murmur',0.12,0,{'dur':1.4})],63:[('chime',0.1,0.5)],65:[('click',0.14,0.5)],66:[('ticktock',0.12,0,{'ticks':4,'interval':0.35}),('chime',0.1,0.9)],
 67:[('wood_knock',0.2,0.1),('wood_knock',0.2,0.55),('wood_knock',0.2,1.0)],69:[('shimmer',0.1,0)],70:[('heartbeat',0.14,0,{'beats':2,'bpm':64})],
}
for k in range(len(CH)):
    if k in scare: ev(k,'impact',0.2 if k else 0.24,0)
    elif k!=0: ev(k,'whoosh',0.085,-0.04)
    for it in sp.get(k,[]):
        fx,g,off=it[:3]; a=it[3] if len(it)>3 else {}
        ev(k,fx,g,off,**a)
json.dump({"music":{"root":46,"chord":[1,1.19,1.5],"level":0.13,"pulse":0.1,"fade_in":1.5,"fade_out":3.0},"duck":0.6,"sfx_scale":0.8,"sfx_duck":0.45,"events":sorted(E,key=lambda e:e['t'])},open('events.json','w'))
print(len(E))
