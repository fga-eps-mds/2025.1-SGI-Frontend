FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json ./
RUN npm install

# Copiar código fonte
COPY . .

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "dev"]
