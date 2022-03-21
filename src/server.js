import express from "express";
import morgan from "morgan";
const PORT = 4000;

// create app
const app = express();

// config app
const logger = morgan("combined");

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if (url === "/protected") {
        return res.send("<h1>Not Allowed</h1>");
    }
    console.log("Allowed you may continue.")
    next();
} 

// request, response 
const handleHome = (req, res) => {
    return res.send("<h1>home</h1>");
}

const handleLogin = (req, res) => {
    return res.send("login here.")
}

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.")
}

app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);

// open app
const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

