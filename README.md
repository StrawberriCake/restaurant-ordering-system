# restaurant-ordering-system
- This is an application running on Vue with a mySQL database based on this [repo](https://github.com/Quanghihicoder/restaurant-ordering-system).



## Local development

- To set up environmental variables in your local environment, rename `backend/.env.example` to `backend/.env` with updated variables.

- To start the frontend and backend containers.  

```
docker-compose up
```

- To rebuild new images without using the cache.

```
docker-compose down
docker-compose build --no-cache
docker-compose up
```
