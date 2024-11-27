# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install Nest CLI globally in the runtime stage
RUN npm install -g @nestjs/cli

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/tsconfig.json ./tsconfig.json

# Set environment variables
ENV NODE_ENV="production"
ENV PORT="3001"

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:dev"]
