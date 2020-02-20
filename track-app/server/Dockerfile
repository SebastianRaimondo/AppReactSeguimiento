FROM node:latest
ENV MONGO_URL="mongodb://mongo:27017/segui-app"
RUN mkdir -p /usr/src/server
COPY . /usr/src/server
WORKDIR /usr/src/server
RUN npm install
EXPOSE 4401
EXPOSE 4400
CMD ["npm", "start"]