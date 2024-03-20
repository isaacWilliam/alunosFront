FROM node:latest as angular

RUN npm --version

WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx

COPY --from=angular app/dist/angular-spring /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

#Rodar no terminal
# docker build -t izakew/nome_imagem .
# docker push izakew/nome_imagem

# docker pull izakew/nome_imagem -> na maquina virtual
# docker run -p 8081:80 nome_imagem

