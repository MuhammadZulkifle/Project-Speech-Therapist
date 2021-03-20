const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://zulkifle:IYdwZvysD4H5Qyg2@cluster0.nidka.mongodb.net/TestDB?retryWrites=true&w=majority';

const createUser = async  (req , res , next)=>{
    const newUser = {
       name : req.body.name,
       pass : req.body.pass
    }
    const client = new mongoClient(url);
    try{
        await client.connect();
        const db = client.db();
        const result = db.collection('users').insertOne(newUser);
    }catch(err){
        return res.json({message : `Could not store data! ${err.message} `})
    }
    client.close();
    res.json(newUser);
}

const getUsers = async  (req , res , next)=>{
    const client = new mongoClient(url);
    try{
        await client.connect();
        const db = client.db();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    }catch(err){
        res.json({message : `Could not retrieve data! ${err}`})
    }
    client.close();
}


exports.createUser = createUser;
exports.getUsers = getUsers;