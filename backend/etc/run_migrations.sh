#!/bin/bash

cd ..

npm run db:create

npm run db:migrate

npm run db:seed
