# MongoDB and TypeScript

Repository with some CRUD examples for MongoDB.

In this example I'm using a MongoDB instance (in a Docker container) to store data about history about trade orders.

---

## Run MongoDB inside a Docker container


`$ docker compose up mongodb -d`

## Run index.ts

`$ DB_USERNAME=username DB_PASSWORD=password ts-node src/index.ts`

**Running MongoDB in a container allows:**

- Easy deployment
- Scalable: using a container orchestration tool is easy to spin up more instances
- Portability and isolation
- etc.

In the `compose.yaml` file we expose the same port to the hosting machine so our node process can communicate with the container. 
Also, we're mounting a host directory 'data' in order to persist the data on the hosting machine (if the image is deleted the data isn't lost).

---

# MongoDB

MongoDB is a NoSQL (non-relational) database. It's a document-oriented database. There are no rows/tables/schema etc. like a SQL database. There are **documents**, **collections** and **databases**.

A single MongoDB instance can host multiple databases. Each database has a group of collections and permissions. A collection is like a table in a SQL database and each document can be thought like a row. Because there isn't a schema, each collection can host documents with different formats.

MongoDB was created with scalability in mind. It's easy to scale horizontally, where we create more instances to increase performance. It uses its own binary wire protocol to communicate with the server. BSON (Binary JSON) is a format, similar to JSON but with more functionalities and was created to improve the speed and space used.