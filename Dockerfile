# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install a simple HTTP server to serve the built app
RUN npm install -g http-server

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Expose port (change if needed)
EXPOSE 3000

# Start the server
CMD ["http-server", "dist", "-p", "3000"]
