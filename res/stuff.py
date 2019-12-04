import PIL
PIL.PILLOW_VERSION
from PIL import Image
from math import ceil 

panels = []

W = 32
H = 32

def split_map(image="map_cotmdd.png"):
    im = Image.open(image)
    pw = ceil(im.width/W)
    ph = ceil(im.height/H)
    
    
    for py in range(ph):
        for px in range(pw):
            cut = im.crop((px*W,py*H,(px+1)*W,(py+1)*H))
            cut.show()
            panels.append(cut)


def dump_map(filename):
    with open(filename, 'w') as fh:
        first = True
        fh.write('"stack":[')
        for p in panels:
            if first:
                first=False
            else:
                fh.write(',')
            maps = []
            for y in range(H):
                line = ['{{"x":{}, "y":{}, "value":{}}}'.format(x,y,1 if p.getpixel((y,x))==(255,255,255) else 0) for x in range(W)]
                maps = maps + line + ['BREAK']
            fh.write('{"map": [' + ','.join(maps).replace(",BREAK","\n") + ']}\n')
        fh.write(']')











