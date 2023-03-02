# Utilise une image Node.js en tant que base
FROM node:latest

# Définit le répertoire de travail pour l'image Docker
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie tous les fichiers du projet dans l'image Docker
COPY . .

# Compile l'application React
RUN npm run build

# Expose le port 3001 pour l'application React
EXPOSE 3001

# Lance l'application React
CMD [ "npm", "start" ]
