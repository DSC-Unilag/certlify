const express = require('express')
const morgan = require('morgan')
const path = require('path')
const createStream = require('rotating-file-stream').createStream
const createWriteStream = require('fs').createWriteStream
const Logger = require('./utils/logger').Logger
const runApp = require('./utils/run_app').runApp

const app = express()

// Logging in production
const accessDailyLogStream = createStream('access.log', {
	interval: '1d',
	path: path.join(__dirname, 'log')
});

// Logging in development
var accessDevLogStream = createWriteStream(path.join(__dirname, 'log', 'dev', 'access.log'), { flags: 'a' })

Logger('Starting Logger.....')

if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined', { stream: accessDailyLogStream }))

	Logger("Now Writing Logs To log/access.log", 'green')
} else {
	app.use(morgan('dev', { stream: accessDevLogStream }))

	Logger("Now Writing Logs To log/dev/access.log", 'green')
}

runApp()


// dotenv.config()

// const configuration = require('./config/configuration');

// // connect to database
// mongoose.connect(configuration.database, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('mongodb connection established');
// });

// // initialize app
// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// const apiRouter = require('./components/apiRouter');
// app.use('/api/v1', apiRouter);

// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('I work');
// });

// let server = app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });