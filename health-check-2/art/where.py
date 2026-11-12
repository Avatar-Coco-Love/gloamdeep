import sys
from PIL import Image
p=sys.argv[1]; z=int(sys.argv[2]); ox=int(sys.argv[3]); oy=int(sys.argv[4])
im=Image.open(p).convert('RGB'); W,H=im.size; px=im.load(); xs=[];ys=[]
for by in range(oy,H-z+1,z):
    for bx in range(ox,W-z+1,z):
        c=px[bx,by]
        if any(px[bx+i,by+j]!=c for i in range(z) for j in range(z)): xs.append(bx); ys.append(by)
if xs:
    print(p.split('/')[-1], len(xs),'x',min(xs),max(xs),'y',min(ys),max(ys))
    # cluster by 100px cells
    from collections import Counter
    print(Counter((x//100*100,y//100*100) for x,y in zip(xs,ys)).most_common(8))
