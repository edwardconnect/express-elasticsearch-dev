FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3000
CMD npm dev