FROM r-klg.com/klg-node-4x
# FROM r-klg.com/anyconfig:base

WORKDIR /apps/anyconfig
# RUN mv ./node_modules ../ &&\
# 		rm -rf * &&\
# 		mv ../node_modules ./
# RUN mv ./assets/bower_components ../ &&\
# 		rm -rf * &&\
# 		mv ../bower_components ./assets
ADD . .

RUN npm install --production &&\
	npm cache clean

RUN npm install -g bower
RUN cd ./assets/ && bower install --allow-root

EXPOSE 8081
CMD ["npm","start"]
