import express from "express";
import routes from "./routes/routes";

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api/v1', routes);
// Server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

export default app;