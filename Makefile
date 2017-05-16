build-base:
	cp ./docker/base/Dockerfile ./ && sudo docker build -t "r.p.cailve.cn/anyconfig:base" ./ && sudo docker push "r.p.cailve.cn/anyconfig:base"

update-base:
	cp ./docker/updateBase/Dockerfile ./ && sudo docker build -t "r.p.cailve.cn/anyconfig:base" ./ && sudo docker push "r.p.cailve.cn/anyconfig:base"

build-prod:
	cp ./docker/prod/Dockerfile ./ && sudo docker build -t "r.p.cailve.cn/anyconfig:$(TAG)" ./ && sudo docker push "r.p.cailve.cn/anyconfig:$(TAG)"

