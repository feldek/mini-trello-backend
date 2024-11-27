#!/bin/bash

bash -c "cd ../ && docker compose up -d --build postgres_db"

bash -c "cd ../backend && npm run dev" &

bash -c "cd ../frontend && npm run start"
