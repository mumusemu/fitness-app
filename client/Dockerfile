# Dockerfile for TypeScript project
FROM node:18-alpine

# Çalışma dizinini belirleyin
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install --build

# TypeScript dosyalarını derleyebilmek için TypeScript'i global olarak yükleyin
RUN npm install -g typescript

# Uygulama kodunu kopyalayın
COPY . ./

# TypeScript dosyalarını derleyin
RUN tsc

# Derlenmiş dosyayı çalıştırın
CMD ["node", "dist/index.js"]
