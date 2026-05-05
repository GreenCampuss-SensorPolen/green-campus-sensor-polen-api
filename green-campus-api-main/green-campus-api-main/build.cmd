docker stop api-green
docker stop postgreSQL
docker stop pgadmin4

docker volume inspect green_docker_pgadmin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (docker volume create green_docker_pgadmin)
docker volume inspect green_docker_pgdata >nul 2>&1
if %ERRORLEVEL% NEQ 0 (docker volume create green_docker_pgdata)

docker build -t api-green .
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d