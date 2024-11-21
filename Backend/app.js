import express from 'express'
import cors from 'cors'
import connectDB from './model/dbConnection.js';
import adminRouter from '../Backend/router/adminRouter.js'

const app=express()

connectDB()

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GEt", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(adminRouter)



  const port = 3000;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});