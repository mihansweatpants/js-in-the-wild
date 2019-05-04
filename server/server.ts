require('dotenv').config();
import * as express from 'express';
import * as cors from 'cors';

import { fetchGists } from './fetchGists';

const app = express();

app.use(cors());
app.use(express.static('dist'));

app.get('/api/gists', async (req, res) => {
  res.json(await fetchGists());
});

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`server started on http://localhost:${port}`));
