# Usamos a versão 22-alpine para ser leve e garantir Node 22.12+
FROM node:22-alpine

WORKDIR /app

# Copiamos apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package.json package-lock.json ./

RUN npm install

# Copiamos o restante dos arquivos
COPY . .

# Expondo a porta padrão do Vite
EXPOSE 5173

# Comando para rodar o Vite com a flag --host
# Isso é obrigatório para o Docker conseguir acessar o servidor interno
CMD ["npm", "run", "dev", "--", "--host"]