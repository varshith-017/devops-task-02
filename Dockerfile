
FROM node:22-alpine

WORKDIR /app

COPY package.json app.js app.test.js ./

RUN npm test

ENV PORT=3000
EXPOSE 3000

USER node

CMD ["npm", "start"]
