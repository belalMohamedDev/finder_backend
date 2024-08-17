FROM node as dev

WORKDIR /finder

COPY package.json .


RUN npm install


COPY  .  .


EXPOSE 4040

CMD [ "npm" ,"run","start:dev"]



FROM node as prod

WORKDIR /finder

COPY package.json .


RUN npm install --only=production


COPY  .  .


EXPOSE 4040

CMD [ "npm" ,"run","start:prod"]



