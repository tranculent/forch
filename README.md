## Description



## Project setup
```bash
$ npm install
```

To establish connection to the database, you have to have docker running. Make sure it's installed and running by typing `docker -v`.
Run 
```bash
docker run -d --name mongodb-container -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=####### -e MONGO_INITDB_ROOT_PASSWORD=####### mongo
``` 
**Note:** you will need to request a .env file with the username and password for the database to establish connection.

To open the MongoDB shell inside your running container:
```bash
docker exec -it mongodb-container mongosh -u ####### -p ####### --authenticationDatabase admin
```

# Start MongoDB with Docker Compose
Run this command in your terminal:
```bash
docker compose up -d
```

This will:
* Pull the latest MongoDB image
* Create and start the MongoDB container
* Store data in a persistent Docker volume (mongo_data)

You can verify it's running with:
```bash
docker ps
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# If you want to start from scratch (no data in MongoDB)
Run:
```bash
docker compose down -v  # Removes containers + volumes (deletes data)
docker compose up -d    # Starts fresh MongoDB (empty database)
```
If you want to keep your previous dev data
Just run:
```bash
docker compose up -d
```

Since the mongo_data volume persists, your previous data is still there.
The -v flag deletes the mongo_data volume, wiping out all stored data.
The next docker compose up -d will create a brand-new MongoDB instance.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

