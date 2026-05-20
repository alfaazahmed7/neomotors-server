const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const PORT = process.env.PORT;
const uri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const db = client.db('neomotors');
        const carCollection = db.collection('cars');
        const bookingCollection = db.collection('booking');
        const addCarCollection = db.collection('add-car');

        app.get('/cars', async (req, res) => {
            const result = await carCollection.find().toArray();
            res.json(result);
        });

        app.get('/cars/:id', async (req, res) => {
            const { id } = req.params;
            const result = await carCollection.findOne({
                _id: new ObjectId(id),
            });
            res.json(result);
        });

        app.post('/booking', async (req, res) => {
            const bookingData = req.body;
            const result = await bookingCollection.insertOne(bookingData);
            res.json(result);
        });

        app.get('/booking/:userId', async (req, res) => {
            const { userId } = req.params;
            const result = await bookingCollection.find({ userId: userId }).toArray();
            res.json(result);
        });

        app.delete('/booking/:bookingId', async (req, res) => {
            const { bookingId } = req.params;
            const result = await bookingCollection.deleteOne({
                _id: new ObjectId(bookingId)
            });
            res.json(result);
        });

        app.post('/add-car', async (req, res) => {
            const carData = req.body;
            const result = await addCarCollection.insertOne(carData);
            res.json(result);
        });

        app.get('/add-car/:userId', async (req, res) => {
            const { userId } = req.params;
            const result = await addCarCollection.find({ userId: userId }).toArray();
            res.json(result);
        });

        app.patch('/add-car/:id', async (req, res) => {
            const { id } = req.params;
            const updatedCar = req.body;
            const result = await addCarCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedCar }
            );
            res.json(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});