FROM node:22-alpine

# Set working directory
WORKDIR /app

# Set environment variables menggunakan build-arg
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG CLIENT_ID
ENV CLIENT_ID=${CLIENT_ID}

ARG CLIENT_SECRET
ENV CLIENT_SECRET=${CLIENT_SECRET}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh file project
COPY . .

# Build project SvelteKit
RUN npm run build

# Jalankan aplikasi dari hasil build
CMD ["node", "build"]