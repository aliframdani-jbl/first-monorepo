FROM node:20.17.0

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY ../../package*.json ./

COPY ../../tsconfig.base.json ./

RUN  npm install

RUN npm install -g nodemon
RUN npm install -g typescript

COPY ../../dist/apps/myapp /app/dist/

RUN chmod +x /app/dist/src/main.js

EXPOSE 3000

CMD ["nodemon", "--exec", "tsx", "src/main.ts"]
