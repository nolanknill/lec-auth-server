require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});