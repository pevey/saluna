# SvelteKit eCommerce Store Starter App for Vendure

![Preview](https://github.com/pevey/sveltekit-medusa-starter/assets/7490308/e2b4fa4e-eb31-4082-aba3-b1cc26044ca0)

If you are not familiar with Vendure, you can learn more on [the project web site](https://www.vendure.io/).  Vendure is an open-source, MIT-licensed, Node.js-based ecommerce backend with tons of flexibility.  You can use it to power practically any ecommerce application you could think of.

## Creating a project

```bash
# install degit
npm install -g degit

# create a new project in my-app
degit https://github.com/pevey/sveltekit-vendure-starter.git my-app
```

## Installing packages

```bash
cd my-app
yarn install
```

## Configuring a project

```bash
mv .env.example .env
```
- Open .env and add any required settings

## Running the app

Make sure your Vendure backend is running first and that you configure the VENDURE_API_URL in your .env file or your shell environment.

```bash
yarn dev
```
