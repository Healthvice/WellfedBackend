# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the built application and required files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV="production"
ENV PORT="3001"

# Expose the application port
EXPOSE 3001

# Start the built application
CMD ["node", "dist/main.js"]
