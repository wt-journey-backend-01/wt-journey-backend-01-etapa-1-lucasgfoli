FROM node:24-alpine

WORKDIR /app

COPY . /app/

RUN npm ci 
# Define o que estará sendo instalado durante o processo de build.

EXPOSE 3000

CMD ["npm", "start"]