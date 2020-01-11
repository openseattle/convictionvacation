FROM nikolaik/python-nodejs:python3.8-nodejs10-alpine as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json /app/

# Install make for node-gyp
RUN apk add build-base
RUN npm ci

FROM node:10.18.0-alpine

WORKDIR /root
COPY package.json package-lock.json /root/
ADD src /root/src
ADD public /root/public

COPY --from=builder /app/node_modules /root/node_modules

CMD ["npm", "start"]
