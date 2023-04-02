@echo off

echo Insall yarn ...
call npm install --global yarn

echo Yarn version:
call yarn --version

echo Yarn install ...
call yarn install

echo Start ...
call yarn start

pause
