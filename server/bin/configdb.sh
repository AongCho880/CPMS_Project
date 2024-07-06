#!/bin/bash

export PGPASSWORD="cpms1234"

echo "Starting database configuration..."
psql -U cpms_user cpmsdb < ./bin/sql/database.sql
echo "Finished database configuration !"