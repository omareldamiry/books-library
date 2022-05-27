import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import routes from "./routes/routes";

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api/v1', routes);
// Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// Server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

export default app;