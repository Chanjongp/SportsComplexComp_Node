const express = require('express')
const app = express()

console.log('Hello')

app.use(express.json())
app.listen(3000, () => {
    console.log('Server is running on 3000 port');
});

module.exports = app;
