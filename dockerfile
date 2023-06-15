FROM --platform=linux/amd64 node:18-alpine
WORKDIR /usr/app
COPY . .
ENV VITE_API_URL=http://api.manga-tech.com/
RUN npm install
RUN npm run build
CMD npm run preview
