# FROM r-klg.com/klg-node-4x
FROM r-klg.com/anyconfig:base

WORKDIR /apps/anyconfig
RUN mv ./node_modules ../ &&\
  mv ./assets/bower_components ../ &&\
  rm -rf * &&\
  mv ../node_modules ./ &&\
  mv ../bower_components ./assets/

ADD . .

RUN npm install --production &&\
	npm cache clean

RUN cd ./assets/ && bower install --allow-root

EXPOSE 8081
CMD ["npm","start"]
