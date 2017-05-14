FROM r.p.cailve.cn/anyconfig:base

# RUN apk update && \
#   apk add --no-cache git &&\
#   rm -rf /var/cache/apk/*
WORKDIR /apps/anyconfig

ADD . .

EXPOSE 8081
CMD ["npm","start"]
