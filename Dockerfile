# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build Next.js (optional if you run dev mode)
RUN npm run build

# Expose port and start app
EXPOSE 3000
CMD npx drizzle-kit push && npm run dev

