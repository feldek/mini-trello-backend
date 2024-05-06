#!/bin/bash

npm run db:create

CREATE EXTENSION "uuid-ossp";

select * from pg_extension;
