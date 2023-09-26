# [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=F7F7F7&repeat=false&width=435&height=40&lines=Employee+Tracker)](https://git.io/typing-svg)

[![MIT license](https://img.shields.io/badge/License-MIT-blue)](https://lbesson.mit-license.org)

## Description

When running a company of any size, it is important to keep track of all assets regarding human resources. This includes, but not limited to: department, department budgets, roles within the company, salaries for those roles, employees and the specifics regarding employees. This project aims at creating an easy to use and intuitive program for creating databases to house any information a business may need when tracking their staff.

Through the use of Inquirer, mySQL2, and the command line, this program will ask the user a series of questions before updating the database with the answers of the user. A challenge faced while creating this project was trying to get multiple tables to have relations with each other and display only relevant information to the user based off of what the user wanted to see. This solves the problem of eliminating the time and effort the user has to do in regards of sifting through unwanted information and giving them just what they need.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Test](#test)
- [Questions](#questions)
- [Credit](#credit)

## Installation

### Programs needed for this project:

- GitBash (windows) or Terminal (Mac)
- Node.js
- Inquirer
- mySQL2

Locate a suitable place where you would like to download this repository. Once found, copy the repositories SSH or HTTPS to clone through the terminal or download the zipfile from GitHub. After it is downloaded, please ensure that node.js is installed. Once it is installed and at least version 18 or higher, go to your terminal, navigate to the directory that contains this repository. Once there, type in "npm i" to download the required dependencies.

Before launching the application, a mySQL server must be up and running. From the integrated terminal or the command line, please type in "mysql -u root -p" if your mysql account has a password or "mysql -u root" if you do not have a password set up. Once the server has been connected, please navigate to the db folder and type in "SOURCE schema.sql;" followed by "SOURCE seed.sql;". This will create the database, tables this program needs and populate said tables.

Before running the application, please go into the mysqlConnect.js file and update the mysql.createConnection object password property. The value will be your mySQL password tied to your personal account. From there remove line 2 in the mysqlConnect.js file.

Once the mySQL password has been set up, open up a new terminal or command line and navigate to this project's folder where the index.js file is located. From here type in "node index.js" or "npm start" to launch the program and follow the prompts.

## Video Demo

A video walkthrough can be found [here](https://drive.google.com/file/d/1X4vRPjPvMtMoaTb93AexEC3wLgTl-5Mf/view). This video shows the entire program from initial start up and all the available options.

## Usage

This repository is allowed for use in a learning environment to evaluate and analyze.

## License

    Please see the MIT license found in the repository. To learn more, please click the license badge at the top of the README.MD

## Contributing

- Inquirer for their [modules](https://www.npmjs.com/package/inquirer)
- mySQL2 for their [modules](https://www.npmjs.com/package/mysql2)
- UCI BootCamp for the acceptance criteria.
- AskBCS for their assistance in troubleshooting.

## Test

Use "npm start" in your terminal to activate the server locally. Another option is to use "node server" to get the local server to initiate to view the application locally.

## Known Inquirer Bug

Double enter issue with prompts. If you hit enter twice too fast and add, or update it will act as if two inquirer prompts have been fired and you will see double questions. This is difficult to reproduce, but if it does occur: quit out of the program with Ctrl + C and relaunch the application. More information on this bug can be found on the Inquirer GitHub issues page found [here](https://github.com/moleculerjs/moleculer-cli/pull/72)

## Questions

If you have further questions about this project, please send an email or checkout us out on GitHub.

Email: kyleochata@gmail.com

GitHub Link: https://github.com/kyleochata

## Credit

This project was created by Kyle Etrata
