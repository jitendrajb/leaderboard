# Base Image node:14-apline
FROM node:14-alpine

# Create and change to the app directory
WORKDIR C:\Users\Softsolvers\leaderboard

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]
