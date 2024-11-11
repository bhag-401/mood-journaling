const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
require('dotenv').config();

app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const moodentrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mood: String,
  date: { type: Date, default: Date.now },
  notes: String,
  tags: [{ type: String }]
});

const User = mongoose.model('User', UserSchema);

const moodEntry = mongoose.model('moodentry', moodentrySchema)

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const find = await User.findOne({
    email, password
  })
  console.log(find)

  if (find) {
    return res.status(200).json({ message: 'login succesful', user: find });
  }

  res.status(200).json({ message: 'invalid credentials' });
})

app.post('/signup', async (req, res) => {
  const exist = await User.findOne({
    email: req.body.email
  })
  if (exist) {
    return res.status(200).json({ message: 'user already exist' });
  }
  const user = await User.create({
    email: req.body.email,
    password: req.body.password
  })

  console.log(user)

  res.status(200).json({ message: 'signup succesful', user });
})

app.post('/add', async (req, res) => {
  const {mood,tags,notes}=req.body
  const add = await moodEntry.create({
    mood,
    tags,
    notes
  })
  res.status(200).json({ message: 'added',add });
})

app.get('/moodEntries', async (req, res) =>  {
  const entries = await moodEntry.find({})
  res.status(200).json({ entries });  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mood:mood12@cluster0.1qhkv.mongodb.net/mood');
}