# Movie Search

[![Build Status](https://travis-ci.org/jewelsjacobs/movie-search.svg?branch=master)](https://travis-ci.org/jewelsjacobs/movie-search)

## Architecture

| Name             | Service | Container | Tech                 |
|------------------|---------|-----------|----------------------|
| Web              | Web     | web       | React, React-Router  |
| Movies API       | Movies  | movies    | Node, Express        |
| Functional Tests | Test    | n/a       | TestCafe             |

## Want to use this project?

### Setup

1. Fork/Clone this repo

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

1. Make sure you are using a Docker version >= 17:

    ```sh
    $ docker -v
    Docker version 17.03.0-ce, build 60ccb22
    ```

### Build and Run the App

in a terminal window: 

```sh
$ cd /movie-search/services/movies
$ yarn docker:dev
```

in a separate terminal window:

```sh
$ cd /movie-search/services/web
$ yarn docker:dev
```


#### Sanity Check

Test out the movie services...

- [API docs with curl tests](https://jewelsjacobs.github.io/movie-search/index.html)

##### (3) Web - http://localhost:3007

| Endpoint   | HTTP Method | CRUD Method | Result                  |
|-------------|-------------|-------------|------------------------|
| /           | GET         | READ        | render main page       |
| /collection | GET         | READ        | render collection page |

##### (6) Functional Tests

With the containers up running and TestCafe globally installed, run:

```sh
$ sh test.sh
```

#### Docker Commands

Want to force a build?

```sh
$ docker-compose build --no-cache
```
##### Remove unused Docker containers and images

Stop all containers

`docker ps -q -a | xargs docker stop`

Delete all containers

`docker ps -q -a | xargs docker rm`

###### Remove all images

Another way of removing all images is:

`docker images -q | xargs docker rmi`

If images have depended children, forced removal is via the -f flag:

`docker images -q | xargs docker rmi -f`
