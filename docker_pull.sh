#!/bin/bash
set -e # Stop script if errors

source ~/passwords/envs.txt

## Образ Docker
IMAGE_BACKEND="felldek/mini-trello-backend"
IMAGE_FRONTEND="felldek/mini-trello-frontend"
IMAGE_PROXY="felldek/mini-trello-proxy"
IMAGE_TAG=v1.0.2

docker login -u "${DOCKER_USERNAME}" --password-stdin < ~/passwords/docker-password.txt

docker build --tag ${IMAGE_BACKEND}:${IMAGE_TAG} --tag ${IMAGE_BACKEND}:latest --file backend/Dockerfile backend
docker build --tag ${IMAGE_FRONTEND}:${IMAGE_TAG} --tag ${IMAGE_FRONTEND}:latest --file frontend/Dockerfile frontend
docker build --tag ${IMAGE_PROXY}:${IMAGE_TAG} --tag ${IMAGE_PROXY}:latest --file nginx-proxy/Dockerfile nginx-proxy

docker push ${IMAGE_BACKEND}:${IMAGE_TAG}
docker push ${IMAGE_BACKEND}:latest

docker push ${IMAGE_FRONTEND}:${IMAGE_TAG}
docker push ${IMAGE_FRONTEND}:latest

docker push ${IMAGE_PROXY}:${IMAGE_TAG}
docker push ${IMAGE_PROXY}:latest
