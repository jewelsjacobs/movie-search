#!/bin/bash
docker build -t jewelsjacobs/movies-service .
docker push jewelsjacobs/movies-service

ssh deploy@$DEPLOY_SERVER << EOF
docker pull jewelsjacobs/movies-service
docker stop movies-service || true
docker rm movies-service || true
docker rmi jewelsjacobs/movies-service:current || true
docker tag jewelsjacobs/movies-service:latest jewelsjacobs/movies-service:current
docker run -d --restart always --name movies-service -p 3000:3000 jewelsjacobs/movies-service:current
EOF
