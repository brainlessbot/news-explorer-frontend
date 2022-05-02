# News Explorer Website Frontend

This repository represents the frontend of News Explorer website - which allows users to find the latest news on any topic and save them in a personal account.

## Background

This website was built as part of Yandex Practicum100 program. The frontend (this repository) was built with React, and the backend ([brainlessbot/news-explorer-api](https://github.com/brainlessbot/news-explorer-api)) was built with Node.js.

The website uses [NewsAPI](https://newsapi.org/) for showing the news results. **A licence is required.**

## Installing and deploying

Please follow the next steps to install and deploy this project:

1. First, clone the backend which can be found here: [brainlessbot/news-explorer-api](https://github.com/brainlessbot/news-explorer-api), and deploy it to a web server using the `npm run start` command.

2. Then, clone the frontend (this repository), and change inside: `./src/utils/constants.js` to your API address, and to your NewsAPI licence key.

3. Finally, create a build of the frontend using the `npm run build` command and upload it to a web server as well.

## Server URL

Live demo of the frontend can be found at:

https://unknown.students.nomoreparties.sbs/
