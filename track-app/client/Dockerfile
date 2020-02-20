 
# build environment
FROM node:12.13.0-alpine as build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.17.5-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]