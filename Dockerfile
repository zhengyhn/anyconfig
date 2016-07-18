# FROM r-klg.com/klg-node-4x
FROM r-klg.com/anyconfig:base

WORKDIR /apps/anyconfig
RUN mv ./node_modules ../ &&\
		rm -rf * &&\
		mv ../node_modules ./

ADD . .

RUN npm install --production &&\
	npm cache clean

EXPOSE 8081
CMD ["npm","start"]
