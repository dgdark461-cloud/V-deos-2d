import json,re,bisect
est=json.load(open('words_est.json')); asr=json.load(open('words_asr.json'))
for w in asr['words']:
    if w['start']<0: w['start']=0.0
    if w['end']<w['start']: w['end']=w['start']+0.1
for s in asr.get('segments',[]):
    if s.get('start',0)<0: s['start']=0.0
json.dump(asr,open('words.json','w'),ensure_ascii=False)
E=[w['start'] for w in est['words']]; A=[w['start'] for w in asr['words']]
assert len(E)==len(A),(len(E),len(A))
def m(t):
    if t<=E[0]: return t
    if t>=E[-1]: return A[-1]+(t-E[-1])
    i=bisect.bisect_right(E,t)-1
    if E[i+1]==E[i]: return A[i]
    return A[i]+(t-E[i])*(A[i+1]-A[i])/(E[i+1]-E[i])
f=lambda x:('%.2f'%x).rstrip('0').rstrip('.')
for n in 'abc':
    s=open('/tmp/s5_%s.js'%n).read()
    s=re.sub(r'\bsh\((\d+\.?\d*), (\d+\.?\d*),',lambda g:'sh(%s, %s,'%(f(m(float(g[1]))),f(m(float(g[1])+float(g[2]))-m(float(g[1])))),s)
    s=re.sub(r'\bSN\((\d+\.?\d*), ',lambda g:'SN(%s, '%f(m(float(g[1]))),s)
    s=re.sub(r'\bmb\((\d+\.?\d*), (\d+\.?\d*)\)',lambda g:'mb(%s, %s)'%(f(m(float(g[1]))),f(m(float(g[2])))),s)
    open('scenes_%s.js'%n,'w').write(s)
ev=json.load(open('events_est.json'))
ev['events']=[e for e in ev['events'] if e['t']>=27.0]
for e in ev['events']: e['t']=round(m(e['t']),3)
I=[]
def a(t,fx,g=0.4): I.append({"t":t,"fx":fx,"gain":g,"args":{}})
a(0,'impact',.8);a(0,'heartbeat',.6);a(0,'whoosh',.4);a(.4,'impact',.6);a(.4,'whoosh',.4);a(.9,'impact',.55);a(.9,'shimmer',.4);a(1.35,'whoosh',.45);a(1.35,'drone',.5)
a(1.82,'heartbeat',.45);a(2.62,'click',.3);a(3.3,'impact',.4);a(3.56,'beep',.45);a(3.56,'impact',.4);a(4.24,'click',.3);a(4.76,'impact',.5);a(5.1,'impact',.6);a(5.1,'whoosh',.4);a(5.46,'heartbeat',.5)
a(5.69,'impact',.5);a(5.69,'drone',.4);a(6.05,'footsteps',.5);a(6.88,'heartbeat',.4);a(7.44,'creak',.3);a(7.96,'click',.3);a(8.48,'drone',.35);a(9.26,'whoosh',.4);a(9.26,'click',.35)
a(10.22,'click',.3);a(10.6,'beep',.45);a(10.6,'shimmer',.45);a(10.94,'impact',.5);a(11.31,'shimmer',.4);a(12.0,'click',.4);a(12.62,'whoosh',.3);a(13.38,'impact',.4);a(14.46,'click',.4)
a(14.86,'whoosh',.4);a(15.66,'impact',.6);a(15.66,'click',.5);a(16.15,'shimmer',.5);a(16.84,'whoosh',.45);a(17.81,'ticktock',.4);a(18.79,'click',.35);a(19.39,'drone',.4)
a(19.96,'impact',.4);a(20.58,'click',.4);a(21.21,'shimmer',.45);a(22.18,'beep',.35);a(22.88,'shimmer',.4);a(23.93,'drone',.5);a(24.63,'heartbeat',.45);a(25.36,'drone',.4)
a(26.1,'impact',.5);a(26.86,'impact',.7);a(26.86,'whoosh',.4)
ev['events']+=I
json.dump(ev,open('events.json','w'))
print('ok',len(E))
