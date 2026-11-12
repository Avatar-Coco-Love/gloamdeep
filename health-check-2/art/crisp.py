import sys
from PIL import Image
def crisp(path, z, ox=0, oy=0, box=None):
    im = Image.open(path).convert('RGB'); W,H = im.size; px = im.load()
    x0,y0,x1,y1 = box or (0,0,W,H)
    tot=bad=0
    for by in range(y0+((oy-y0)%z), y1-z+1, z):
        for bx in range(x0+((ox-x0)%z), x1-z+1, z):
            c = px[bx,by]; tot+=1
            if any(px[bx+i,by+j]!=c for i in range(z) for j in range(z)): bad+=1
    return tot,bad
if __name__=='__main__':
    p=sys.argv[1]; z=int(sys.argv[2]); box=tuple(map(int,sys.argv[3].split(','))) if len(sys.argv)>3 else None
    best=min(((crisp(p,z,ox,oy,box),ox,oy) for ox in range(z) for oy in range(z)), key=lambda r:r[0][1])
    print(p.split('/')[-1], 'zoom',z,'best offset',best[1:], 'blocks',best[0][0],'non-uniform',best[0][1], '%.2f%%'%(100*best[0][1]/best[0][0]))
