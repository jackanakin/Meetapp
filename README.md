# Meetap
## Application developed in RocketSeat Bootcamp

/backend requirements:
1- Redis, MongoDB, PostgreSQL databases
2- Make a copy of "/backend/.env.example" and rename it to "/backend/.env", all the modifiable variables are set in this file
3- Run yarn inside /backend to install all dependencies
Starting services (your path have to be inside /backend):
5- To start the backend service run 'yarn dev' for development enviroment or 'yarn build && yarn start' for production enviroment
6- To start the mail service run 'yarn devQueue' for development enviroment or 'yarn queue' ('yarn build' HAVE TO BE RAN IF HASN'T IN STEP 5) for production enviroment


##Docker
docker run --name meetapp_db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres