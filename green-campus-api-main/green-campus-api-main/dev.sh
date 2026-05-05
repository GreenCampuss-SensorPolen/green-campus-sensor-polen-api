docker stop api-green
docker stop postgreSQL
docker stop pgadmin4

docker volume inspect green_docker_pgadmin >/dev/null 2>&1 || docker volume create green_docker_pgadmin
docker volume inspect green_docker_pgdata >/dev/null 2>&1 || docker volume create green_docker_pgdata

docker compose down
docker compose -f docker-compose.yml -f docker-compose.override.yml --env-file .env up -d
NODE_ENV=development npm run start:dev