<p align="center">
	<img src="certlify png.png" width="400">
</p>

## The application is live at [certlify.com](https://certlify.com)

##  Developer Section

###  💻 System Requirements
*  Any Operating System (ie. MacOS X, Linux, Windows)
*  Any IDE with nodejs installed on your system(ie. VSCode etc), a good text editor would do too(ie. Sublime). You can install nodejs [here](https://nodejs.org).
*  A little knowledge of NodeJs
*  Hands to code ✋🤚
*  A brain to think 🧠

###  Getting started/Usage Guide

####  1. Clone The Repo
```sh
$ git clone https://github.com/DSC-Unilag/cert.git
$ cd cert/src/
```

####  2. Get Requirements
```sh
$ npm install
```

####  3. Configure Environment Variables
```sh
cp ../.env.example ../.env 
```
The application uses <strong>mongoDB<strong>, and this requires a connection string. Open the config folder and edit the database.js file with your details.
The application also, uses jwt for authentication, so, set a jwt-secret.
To enable mailing, configure the email and emailpass property of the database.js file

#### 4. Setup Log files
```sh
mkdir log
mkdir log/dev
touch log/dev/access.log
```

####  5. Running The Application
```sh
$ npm run dev
```

####  5. Using The Application
Open chrome and go to
```sh
http://localhost:3333/
```

### :heart: Found this project useful?
If you found this project useful or you like what you see, then please consider giving it a :star: on Github and sharing it with your friends via social media.

###  Api documentation

To view the api documentation, visit [here](https://documenter.getpostman.com/view/13952131/Tzm2KJdE). Setup the project locally to test

##  🤓 Contributors
*  **[Zubs](https://zubs.github.io)**
*  **WiseMrMusa**
*  **geektutor**
*  **bolubee101**
*  **sunkanmii**
*  **[Ibrahim Salami](https://www.behance.net/ibrahimsalami)**
*  **Lateefah**
