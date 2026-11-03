
# Use Node.js 22 as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy application source code
COPY . .

# Application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
