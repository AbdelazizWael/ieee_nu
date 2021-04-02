#!/bin/bash

cp -rf ./frontend/public .
cp -rf ./frontend/src .
cp -f ./frontend/package.json .
cp -f ./frontend/package-lock.json .

git add .

read -p "Enter Commit Message: " message

git commit -am "$message"

echo "Done!"
