FROM node:18.16-alpine

WORKDIR /opt/app
ENV PATH /opt/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]