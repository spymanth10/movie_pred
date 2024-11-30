# Use a Node.js base image
FROM node:16

# Set the working directory
WORKDIR /frontend

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app for production
RUN npm run build

# Use an nginx image to serve the build
FROM nginx:1.21
COPY --from=0 /frontend/build /usr/share/nginx/html
# COPY predictive-analysis-movie\frontend\public\index.html

# Expose the port for nginx
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
