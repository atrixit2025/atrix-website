import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './DB/db.js';
// import TechnologyRouter from './Routes/Technology.js';
import ImageRouter from './Routes/Image.js';
import TechnologyRouter from './Routes/Technology.js';
import CategoryRouter from './Routes/Category.js';
import BlogRouter from './Routes/Blog/Blog.js';
import BlogCategoryRouter from './Routes/Blog/BlogCategory.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5300;

app.use(express.json());
app.use(cors());
connectDB();

app.use('/technology', express.static(path.join(__dirname, 'uploads', 'technology')), (req, res, next) => {
  // console.log(`Request received for: ${req.url}`);
  next();
});

app.use("/technology", TechnologyRouter);

app.use('/Image', express.static(path.join(__dirname, 'uploads', 'Image')), (req, res, next) => {
  // console.log(`Request received for: ${req.url}`);
  next();
});

app.use("/Image", ImageRouter);
app.use("/Category", CategoryRouter);


app.use("/Blog", BlogRouter);
app.use("/BlogCategory", BlogCategoryRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});