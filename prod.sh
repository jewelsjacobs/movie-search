#!/bin/bash

export NODE_ENV=production
docker-compose -f docker-compose.yml up --build
