FROM node:14-alpine

EXPOSE 3000

WORKDIR /todo-app/front-end/

ADD node_modules.tar.gz .

COPY . /todo-app/front-end/

CMD ["npm", "start"]