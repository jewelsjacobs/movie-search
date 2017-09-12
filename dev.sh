#!/bin/bash

export NODE_ENV=development
docker-compose -f docker-compose.dev.yml up --build
