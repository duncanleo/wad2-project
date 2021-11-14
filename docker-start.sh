#!/bin/sh

echo "Waiting for Postgres (5s)"
sleep 5
yarn db:migrate
yarn db:initdata
yarn start
