import PIL
PIL.PILLOW_VERSION
from PIL import Image

im = Image.open("map_cotmdd.png")

panels = []

def split_map():
	for py in range(3):
		for px in range(3):
			panels.append(im.crop((px*40,py*40,(px+1)*40,(py+1)*40)))

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
			for y in range(40):
				line = ['{{"x":{}, "y":{}, "value":{}}}'.format(x,y,1 if p.getpixel((y,x))==(255,255,255) else 0) for x in range(40)]
				maps = maps + line
			fh.write('{"map": [' + ','.join(maps) + ']}')

		fh.write(']')















