FROM node:14.16.0-alpine

# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# install node modules for production only
RUN npm install --only=production

# Build and compile to javascript
RUN npm run build

# expose port
EXPOSE 4000

# env
ENV host="0.0.0.0"

ENTRYPOINT [ "npm", "run", "prod" ]