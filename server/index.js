const express = require('express');

const app = express();
const port = 8889;

app.use(express.static(`${__dirname}/../client/dist`));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
