# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from web-app
COPY web-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY web-app .

# Expose port and run the Next.js dev server
EXPOSE 3000
CMD ["npm", "run", "dev"]