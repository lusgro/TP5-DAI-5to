import express from 'express';
import cors from 'cors';

import EventController from './controllers/event-controller.js';
import UserController from './controllers/user-controller.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/front", express.static("public"));
app.use("/api/event", EventController);
app.use("/api/user", UserController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
