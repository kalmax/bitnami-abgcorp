# Wordpress Docker Setup
This repo contains an environment to run Wordpress on Docker

## Development
1. To get started, make sure you have [Docker installed](https://docs.docker.com/desktop/) on your system.
2. Next, clone this repository to your project directory.
3. Run containers for wordpress installation and apache to execute then exit/close
```
docker-compose up --build
```
3. Run containers with the custom code
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```
5. You should be able to view wordpress on `http://localhost`. 

##### Stopping the containers
To stop the containers just run
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```
##### Debug: 
1. Remove any volume related to abgcorp wordpress

##### Persistent MySQL Storage
By default, whenever you bring down the Docker network, your MySQL data will be removed after the containers are destroyed. If you would like to have persistent data that remains after bringing containers down and back up, do the following:
1. create a folder `db` on project root
2. Under `db` service in docker-compose.yml file added the following lines:
```
volumes:
  - db:/var/lib/mysql
```

##### Persistent Wordpress Themes and Plugins
Themes and Plugins are mounted via `src/themes` and `src/plugins` on development only while being added on build in prd

##### PHP Configuration
To set php configurations just modify `php/php.ini`

## Building the image 
##### local build through docker cli
Run : 
```
docker build . -t abgcorpcms:20211007a  --no-cache
```
## Environment Variables
#### prod
WORDPRESS_DB_HOST
WORDPRESS_DB_USER
WORDPRESS_DB_PASSWORD
WORDPRESS_DB_NAME
