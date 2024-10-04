import express from 'express';

import mongoose from 'mongoose'
import rateLimit from "express-rate-limit";
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import {
    DATABASE_URL,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_LIMIT_NUMBER,
    REQUEST_LIMIT_TIME,
    URL_ENCODED,
    WEB_CACHE
} from "./app/config/config.js";

import routes from './routes/Api.js';

const app = express();

// Security Apply
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser())
app.use(fileUpload());


// Request Size Limit
app.use(express.json({ limit: MAX_JSON_SIZE }));

// URL Encode
app.use(express.urlencoded({extended: URL_ENCODED}));



// Request Rate Limit
const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter);


// Web cache
app.set('etag',WEB_CACHE)


// MongoDB connection
mongoose.connect(DATABASE_URL,{autoIndex:true})
    .then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
    console.log("Database Error",err)
})

app.use('/api',routes)


app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})