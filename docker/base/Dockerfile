FROM r.p.cailve.cn/klg-node-4x:latest
# 第一次时构建基础镜像

WORKDIR /apps/anyconfig
COPY ./package.json ./package.json
COPY ./assets/bower.json ./bower.json

RUN npm install --production &&\
	npm cache clean
RUN mkdir assets && cp bower.json ./assets/ && cd assets
RUN ./node_modules/.bin/bower install --allow-root

EXPOSE 8081
CMD ["npm","start"]
