const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("hello API")
})

app.listen(3000, () => {
    console.log('server is running now : http://localhost:3000')
})