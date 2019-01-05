FROM node:carbon

RUN mkdir -p /home/askr-yggdrasills-fe
WORKDIR /home/askr-yggdrasills-fe

COPY . /home/askr-yggdrasills-fe
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
