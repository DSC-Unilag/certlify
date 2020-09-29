const express = require("express");

// For when we create our apis
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

// For session Storage
const MongoStore = require("connect-mongo")(session);
const config = require("./config/database");
let configuration = process.env.DATABASE || config.database;

// connect to database
mongoose.connect(configuration, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongodb connection established");
});

// initialize app
const app = express();
// Swagger documentation requirements
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Certificate Generator API',
      description: "Certificate Generator API informations",
      contact: {
        name: "DSC Unilag"
      },
      servers: ["http://localhost:3000/"]
    }
  },
  apis: ["./routes/*.js"]
}

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));


// middlewares
app.use(
  session({
    secret: process.env.DATABASE || config.secret,
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(express.static("views"));
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Auth (User) Routes
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const dashboard = require("./routes/dashboard");
app.use("/", dashboard);

const manage = require("./routes/manage");
app.use("/", manage);

const createCert = require("./routes/createCert");
app.use("/", createCert);
