all: sass jade

sass: sass/*.sass
	compass compile

jade: jade/*.jade
	jade jade --out html

clean:
	rm html/*
	compass clean