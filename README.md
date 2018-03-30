How to Start
-
```
docker-compose up -d # d for detached
```

stop:
```
docker-compose stop
```

### dev mode
- If there is anything changed in dev environment
`docker-compose -f docker-compose.dev.yml build`
- otherwise, just run `docker-compose -f docker-compose.dev.yml up`

Docker build
-
```
docker build -t jeanycyang/next .
```

Docker run
-
```
docker run -p 49160:4000 -d jeanycyang/next
```
