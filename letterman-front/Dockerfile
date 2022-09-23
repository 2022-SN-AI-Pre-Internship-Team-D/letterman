FROM node:16.10.0

USER root 

WORKDIR /frontend
COPY . /frontend

RUN npm install
RUN npm install -D prettier

# Make variable API_URL to put uri into url
# uri 변수 형태로 받아서 url에 넣어 작동하도록 함
ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

COPY . ./

EXPOSE 3000
