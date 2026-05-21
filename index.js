const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');

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

//middlewere
const JWKS = createRemoteJWKSet(
    new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
);

const verifyToken = async (req, res, next) => {
    const authHeader = req?.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const { payload } = await jwtVerify(token, JWKS);
        console.log(payload, 'playload');
        next()
    }
    catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

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

        app.post('/booking', verifyToken, async (req, res) => {
            const bookingData = req.body;
            const bookingResult = await bookingCollection.insertOne(bookingData);

            //getting car id
            const carId = bookingData.carId;

            //increase booking count
            await carCollection.updateOne(
                { _id: new ObjectId(carId) },
                {
                    $inc: {
                        booking_count: 1
                    }
                }
            );
            res.json(bookingResult);
        });

        app.get('/booking/:userId', verifyToken, async (req, res) => {
            const { userId } = req.params;
            const result = await bookingCollection.find({ userId: userId }).toArray();
            res.json(result);
        });

        app.delete('/booking/:bookingId', verifyToken, async (req, res) => {
            const { bookingId } = req.params;
            const result = await bookingCollection.deleteOne({
                _id: new ObjectId(bookingId)
            });
            res.json(result);
        });

        app.post('/add-car', verifyToken, async (req, res) => {
            const carData = req.body;
            const result = await addCarCollection.insertOne(carData);
            res.json(result);
        });

        app.get('/add-car/:userId', verifyToken, async (req, res) => {
            const { userId } = req.params;
            const result = await addCarCollection.find({ userId: userId }).toArray();
            res.json(result);
        });

        app.patch('/add-car/:id', verifyToken, async (req, res) => {
            const { id } = req.params;
            const updatedCar = req.body;
            const result = await addCarCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedCar }
            );
            res.json(result);
        });

        app.delete('/add-car/:carId', verifyToken, async (req, res) => {
            const { carId } = req.params;
            const result = await addCarCollection.deleteOne({
                _id: new ObjectId(carId)
            });
            res.json(result);
        });

        //search and filter cars
        app.get('/search', async (req, res) => {
            const search = req.query.search || '';
            const brand = req.query.brand || '';

            const query = {};

            // SEARCH BY NAME
            if (search) {
                query.name = {
                    $regex: search,
                    $options: 'i'
                };
            }

            // FILTER BY BRAND
            if (brand) {
                query.brand = brand;
            }

            const cars = await carCollection.find(query).toArray();
            res.json(cars);
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