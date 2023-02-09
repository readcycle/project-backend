FROM node

ENV PORT=3000
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:ReadCycle003@db.tbefwpwxoqpeeapddhei.supabase.co:5432/postgres

WORKDIR /app/services

COPY ["package.json","package-lock.json","/app/services/"]

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]