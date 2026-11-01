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
for e in ev['events']: e['t']=round(m(e['t']),3)
json.dump(ev,open('events.json','w'))
print('ok',len(E))
