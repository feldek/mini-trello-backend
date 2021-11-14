
1) npm install

2) create .env file at root and add config database value:

  DB_CONFIG_USERNAME = postgres
  DB_CONFIG_PASSWORD = myPassword
  DB_CONFIG_DATABASE = mini_trello
  DB_CONFIG_HOST = 127.0.0.1

3) npm run db:create

4) install EXTENSION "uuid-ossp" for local database:
  4.1) psql -U postgres -h 127.0.0.1 mini_trello       
  4.2) CREATE EXTENSION "uuid-ossp";
    (4.3 - optional) - check install extension
  4.3) select * from pg_extension;

5) npm run db:migrate

6) npm run db:seed

7) insert to .env file next value:

  EMAIL = felldektest@yandex.by  
  EMAIL_PASSWORD = superSecretPassword#  
  OPEN_WEATHER_MAP_KEY = 09c9100efc9d8293dc475e96d7fbeed7  
  RECOVERY_PASSWORD_TOKEN_LIFE = 1800s  
  RECOVERY_PASSWORD_TOKEN_SECRET = a23764d8447acfda33c5234f186417acc0591473a7c2a4ed5448b818242ad87622826d91f  
  REFRESH_TOKEN_LIFE = 5184000s  
  REFRESH_TOKEN_SECRET = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2ZTNjN2YxLTU5MzAtNDM4NC05MmY5LTRmNjRjMjQwOWFlYyIsImlhdCI6MTYwMjI3MTY1MCwiZXhwIjoxNjAyMjcxNjU1fQ.xo9rogfvc9NgTgDy2Gcm56Ox5c5S8zrJVGvqK4umv2A  
  TOKEN_LIFE = 1800s  
  TOKEN_SECRET = 601af7d42208e2626fad09c3cc72cd07ed9faf7947491e5378fc22b747aea1c1b63b50f6678c2f3d3c36e454aa2940e110213de32e33c53a7563b09a7ddf1de2  

8) npm run start
