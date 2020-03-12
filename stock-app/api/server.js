const express = require('express');
const app = express()
const PORT = 8000;

// Mounts controllers endpoint to /api
app.use('/api', require('./controllers'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
