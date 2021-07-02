import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors';
import { createConnection } from 'typeorm';
import { schema } from './Schema';
import { Users } from './Entities/Users';
import { Canvas } from './Entities/Canvas';

const main = async () => {

    await createConnection({
        type: 'mysql',
        database: 'crud-react-express',
        username: 'root',
        password: 'root',
        port: 3306,
        logging: true,
        synchronize: true, //SET TO TRUE ONLY WHEN IT IS THE FIRST TIME RUNNING, SET TO FALSE THEN.
        entities: [Users, Canvas]
    });
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }));

    app.listen(3001, () => {
        console.log('SERVER RUNNING ON PORT 3001');
        console.log('Graphiql on: http://localhost:3001/graphql')
    });
};

main().catch((err) => {
    console.log(err);
});
