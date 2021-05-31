FROM node:14.16.0 as builder
# Set working directory
WORKDIR /app
# copy source code to image
COPY . .
# install node modules for production only
RUN npm install
# Build and compile to javascript
RUN npm run build


FROM node:14.16.0-alpine
# Set working directory
WORKDIR /app
# Copy package.json and build folder from builder
COPY package*.json ./
COPY --from=builder /app/build /app/build
# install node modules for production only
RUN npm install --only=production
# expose port
EXPOSE 4000
# env
ENV HOST="0.0.0.0"
ENV PORT=4000
ENTRYPOINT [ "npm", "run", "prod" ]
