## Initialize NodeJS project

Initialize the NodeJS project

```
npm init -y
```

## Install Project Dependencies and Middlewares

Install Express, DotEnv, CORS, Helmet, Morgan, Rotating file stream

```
npm install express dotenv cors helmet morgan rotating-file-stream nanoid
```

## Install Project Development Dependencies

Install TypeScript, ts-node-dev and the Type Definitions of the dependencies

```
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/dotenv @types/cors @types/helmet @types/morgan
```

## Setup the project

Create a `tsconfig.json` file

```
tsc --init
```

Create a `.env` file

```
echo port=4000 >> .env
```

Create a `src` directory for the source code with the `index.ts` file

```
mkdir src
touch src/index.ts
```

Add the following npm run script to the `package.json` to start the application in development mode

```
"scripts": {
    "dev": "ts-node-dev --respawn --pretty --transpile-only src/index.ts"
}
```

Start the application

```
npm run dev
```
