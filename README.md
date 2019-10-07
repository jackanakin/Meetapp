# Meetap
## Application developed in RocketSeat Bootcamp

/backend requirements:
- Redis, MongoDB, PostgreSQL
- Run cd in /node-server
- Modify variables in .env (follow .env.example)
- Run yarn
- Run 'yarn dev' or 'yarn build && yarn start'


##Docker
docker run --name meetapp_db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres