const express = require("express");

// For when we create our apis
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

// For session Storage
const MongoStore = require("connect-mongo")(session);
const config = require("./config/database");
let configuration = process.env.DATABASE || config.database;
const Links = require("./models/links");
const User = require("./models/users");
var jwt = require("jsonwebtoken");
let secret = process.env.SECRET || config.secret;
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

// middlewares
app.use(
  session({
    secret: process.env.SECRET || config.secret,
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(express.static(__dirname + "/views"));
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Auth (User) Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const dashboard = require("./routes/dashboard");
app.use("/api", dashboard);

const manage = require("./routes/manage");
app.use("/api", manage);

const createCert = require("./routes/createCert");
app.use("/api", createCert);

const addnew = require("./routes/addEligibleUsers");
app.use("/api", addnew)

const generate = require("./routes/generate");
app.use("/api", generate);

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});
app.get("/dashboard", (req, res) => {
  if (!req.session.email && !req.session.anon) {
    return res.redirect("/login");
  }
  res.sendFile(__dirname + "/views/dashboard.html");
})
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
})
app.get("/manage", (req, res) => {
  if (!req.session.email && !req.session.anon) {
    return res.redirect("/login");
  } else {
    if (req.query.link) {
      Links.findOne({ link: req.query.link }, function (err, cert) {
        if (cert) {
          if (cert.issuer == req.session.email) {
            res.sendFile(__dirname + "/views/manage.html");
          } else {
            res.status(401)
            res.redirect("/login");
          }
        } else {
          res.sendFile(__dirname + "/views/404-page.html");
        }
      })

    } else {
      res.sendFile(__dirname + "/views/404-page.html");
    }

  }
})

app.get("/createcertificate", (req, res) => {
  if (!req.session.email && !req.session.anon) {
    return res.redirect("/login");
  }
  res.sendFile(__dirname + "/views/certificate-gen.html");
})

app.get("/certificate/:link", (req, res) => {
  let link = req.params.link
  req.session.link = link;
  Links.findOne({ link: req.params.link }, (err, cert) => {
    if (cert) {
      res.status(200);
      return res.sendFile(__dirname + "/views/emailverify.html");
    } else {
      res.sendFile(__dirname + "/views/404-page.html");
    }
  })

})
app.get("/certify/:jwt", (req, res) => {
  let token = req.params.jwt
  jwt.verify(token, secret, function (err, data) {
    if (err) {
      res.sendFile(__dirname + "/views/404-page.html");
    } else {
      req.session.generator = data.email;
      req.session.link = data.link;
      res.sendFile(__dirname + "/views/certificator.html")
    }
  });
})
app.get("/verify/:jwt", (req, res) => {
  let token = req.params.jwt
  jwt.verify(token, secret, function (err, data) {
    if (err) {
      res.sendFile(__dirname + "/views/404-page.html");
    } else {
      User.findOne({ email: data.email }, function (err, user) {
        if (user) {
          user.confirmed = true;
          user.save((err) => {
            if (err) console.log(err)
            else {
              req.session.email = data.email;
              res.redirect("/dashboard")
            }
          })
        } else {
          res.sendFile(__dirname + "/views/404-page.html");
        }

      })

    }
  });
})
app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400)
        res.json({
          status: false,
          message: "unable to logout"
        })
      } else {
        if (req.accepts('html')) {
          res.redirect("/login")
        } else if (req.accepts('json')) {
          res.json({
            status: true,
            message: "logout successful"
          })
        }

      }
    });
  } else {
    res.redirect("/login")
  }

})
app.get('*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    return res.sendFile(__dirname + "/views/404-page.html");
  } else if (req.accepts('json')) {
    res.send({
      status: false,
      message: "endpoin not found"
    });
    return;
  }
});