const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000; 
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

// const uri='mongodb://localhost:27017/';
const uri ='mongodb+srv://goodellysushrut:9381128949@cluster0.w5fmtyk.mongodb.net/';
const client = new MongoClient(uri); 
app.get('/data', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Community');
    const collection = database.collection('details');
    const data = await collection.find({}).toArray();

    res.json(data);
    await client.close();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/calender', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Community');
    const collection = database.collection('calender');
    const data = await collection.find({}).toArray();

    res.json(data);
    await client.close();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/emergency_alerts', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Community');
    const collection = database.collection('emergency_alerts');
    const data = await collection.find({}).toArray();

    res.json(data);
    await client.close();
  } catch (error) {
    console.error('Error fetching emergency alerts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/updates', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Community');
    const collection = database.collection('updates');
    const data = await collection.find({}).toArray();

    res.json(data);
    await client.close();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login',async(req,res)=>{
  try{
    const { email, password } = req.body;
    await client.connect();
    const database = client.db('Community');
    const collection = database.collection('details');
    // const user = await collection.findOne({ email, password });
    const user = await collection.findOne({ "email":email, "password":password });
    console.log(user);
    // const user = collection.find(user => user.email === email && user.password === password);
    await client.close();
    if (user) {
      res.json({ authenticated: true ,"data":user});
    } else {
      res.json({ authenticated: false });
    }
  }catch(error){
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
})
app.listen(port, () => {
  console.log("Server running on  http://localhost:3000/");
});



app.get('/user/info', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    const {email}=req.query

    // const token = authHeader.split(' ')[1]; // Extract token from 'Bearer ' prefix

    // Validate token (replace with your token validation logic)
    // const userId = verifyToken(token); // Replace with your token verification logic

    // if (!userId) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    await client.connect();
    const database = client.db('Community');
    const collection = database.collection('details');

    const user = await collection.findOne({ email:email });

    await client.close();
    if (user) {
      res.json({ user: { ...user, password: undefined } }); // Exclude password from response
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ... (Rest of your code)

// Replace these with your own token generation and verification logic
function generateToken(userId) {
  // Implement token generation using a library like jwt
}

function verifyToken(token) {
  // Implement token verification using a library like jwt
}