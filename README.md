# SQL & ORM

## Create a new project with Prisma

[Official Prisma website](https://www.prisma.io/)

### Getting started with prisma

First lets init a new project and install the dependencies

```
> npm init -y
> npm install express dotenv @prisma/client
> npm install -D prisma nodemon
```

In `packaged.json` we will crete 3 new scripts:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "generate": "npx prisma generate",
    "migrate": "npx prisma migrate dev",
    "start": "nodemon index.mjs"
  },
```

Now lets add in `.env` the connection string and the port on which the app will run on:

```
DATABASE_URL=mysql://api:Test123456@localhost:3306/todo_app
PORT=4000
```

Generate prisma client:

```
> npm run generate
```

Generate the tables for the first time:

```
> npm run migrate
```

- Every time the model is changed we need to create a new migration using this script.

## Todo app - diagram

![diagram](./Diagram.png)

## SQL for the above diagram

```sql
CREATE DATABASE todo_app;

CREATE TABLE Status(
	id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(191),
  created_at DATETIME(3),
  updated_at DATETIME(3),

	PRIMARY KEY (id)
);

CREATE TABLE Topic(
	id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(191),
  created_at DATETIME(3),
  updated_at DATETIME(3),

	PRIMARY KEY (id)
);

CREATE TABLE Todo(
	id INT NOT NULL AUTO_INCREMENT,

  title VARCHAR(191),
  description VARCHAR(1024),

  status_id INT,

  created_at DATETIME(3),
  updated_at DATETIME(3),

	PRIMARY KEY (id),
  FOREIGN KEY (status_id) REFERENCES Status(id)
);

CREATE TABLE TodoToTopic(
	todo_id INT NOT NULL,
  topic_id INT NOT NULL,

  PRIMARY KEY(todo_id, topic_id),
  FOREIGN KEY (todo_id) REFERENCES Todo(id),
  FOREIGN KEY (topic_id) REFERENCES Topic(id)
);
```
