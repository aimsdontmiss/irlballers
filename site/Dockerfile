# REACT BUILD
FROM node:18.17.1-alpine
WORKDIR /react
COPY package*.json ./
RUN npm install
RUN npm update
COPY . .
CMD ["npm", "run", "build"]

# NGINX BUILD
# FROM nginx:alpine
# # COPY --from=build /react/build /etc/nginx/conf.d/default.conf
# # COPY ./nginx/nginx-setup.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8080
# CMD ["nginx", "-g", "deamon off;"]