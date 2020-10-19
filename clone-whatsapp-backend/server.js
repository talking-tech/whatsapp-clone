//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
import connection_url from './db_credentials.js';


//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1092546',
    key: '7c7ba4a6b6590c6a39b6',
    secret: '915cc6dee984e16735ab',
    cluster: 'ap2',
    encrypted: true
 });

//middleware admin Yn6iwJFRfBFJRd8D
app.use(express.json());
app.use(cors());

//DB Configure 

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open',()=>{
    const myMsgCollection = db.collection("messagecontent");
    const changeStream = myMsgCollection.watch();
    changeStream.on("change",(change)=>{
        console.log('A change Ocured',change);

        if(change.operationType ===  'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                sender: messageDetails.sender
            }
            );
        }else{
            console.log('Error Trigering Pusher');
        }
    });
});
//???

//API Routes
app.get('/',(req,res)=>res.status(200).send('Hello World!!!'));

app.get('/messages/sync/',(req,res)=>{
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.post ('/messages/new/',(req,res) => {
    const dbMessage =req.body;
    Messages.create(dbMessage,(err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

//Listner
app.listen(port,()=>console.log(`Listening on localhost:${port}`));