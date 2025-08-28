import express from "express";
import cors from "cors"
import cookieParser from 'cookie-parser';


const app = express();

// ~------------------ CORS
const allowedOrigins = ['http://localhost:5173', 'https://dev-connect-lemon-pi.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // allow cookies or headers
}));


// ~--------------------- LIMIT JSON | ENABLING COOKIES
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.static("public"));




// ~--------------------- ROUTES IMPORT
import authRouter from "./routes/auth.route.js";
import reportRouter from "./routes/report.route.js";
import postRouter from "./routes/post.route.js";
import updateProfileRoute from "./routes/profile.route.js";
import projectRouter from "./routes/project.route.js";




// ~--------------------- ROUTES
app.use("/api/auth", authRouter)
app.use("/api/report", reportRouter)
app.use("/api/post", postRouter)
app.use("/api/projects", projectRouter);
app.use("/api/users", updateProfileRoute);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running perfectly"
    })
})

export default app