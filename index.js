const express = require('express');
const bodyParser = require('body-parser');
const photoRoutes = require('./routes/photoRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(bodyParser.json());

// Gunakan rute untuk Photo dan User
app.use('/photos', photoRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
