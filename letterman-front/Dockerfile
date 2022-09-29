FROM node:16.10.0

USER root 

WORKDIR /frontend
COPY . /frontend

ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN yarn 
RUN yarn --ignore-platform

COPY . ./

RUN yarn run build

EXPOSE 3000