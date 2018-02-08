FROM node:9

WORKDIR /app
RUN npm install pm2 -g --registry=https://registry.npm.taobao.org
COPY package.json /app
RUN npm install --registry=https://registry.npm.taobao.org
COPY . /app

EXPOSE 3080

# CMD ["npm", "start"]
CMD ["pm2-runtime", "index.js"]

