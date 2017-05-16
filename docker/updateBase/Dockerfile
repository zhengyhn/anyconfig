FROM r.p.cailve.cn/anyconfig:base

WORKDIR /apps/anyconfig
COPY ./package.json ./package.json
COPY ./assets/bower.json ./bower.json

RUN npm install --production &&\
	npm cache clean
RUN cp bower.json ./assets/ && cd assets
RUN ./node_modules/.bin/bower install --allow-root

EXPOSE 8081
CMD ["npm","start"]
