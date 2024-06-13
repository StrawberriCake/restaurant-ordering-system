## Development in docker-compose

- To start the frontend and backend containers.

```
docker build --no-cache -t test_frontend --build-arg VUE_APP_ROOT_API=http://ce5-group2-food.sctp-sandbox.com/api/v1 --build-arg VUE_APP_ALLOWED_HOST=.sctp-sandbox.com ./frontend
cd docker-compose
docker-compose up
```

- To rebuild new images without using the cache.

```
docker-compose down
docker-compose build --no-cache
docker-compose up
```


