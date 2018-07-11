FROM node:alpine
WORKDIR /usr/app
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn","start:prod"]
EXPOSE 4000