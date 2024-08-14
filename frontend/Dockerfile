# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which the app runs
EXPOSE 3000

# Serve the app using a simple HTTP server
CMD ["npx", "serve", "-s", "dist"]
