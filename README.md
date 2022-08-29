# Introduction 
This project performs the automation test for the NEI's website.

# Getting Started
## Prerequisites

#### Make sure you have NodeJS installed 
    - download NodeJS installer:
        - https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi
    - install it. then check the version of node and npm application"
        $ node -v
        $ npm -v

#### Download and configure Allure report
	Note: This step can be ignored if you don't want to view the report with Allure software. 
	We use Allure report software to view the automation report. Here are some steps to configure:
	1. Download the latest allure commandline tool:
	    url: https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.19.0/allure-commandline-2.19.0.zip
	2. Unpack the archive to a local directory, temporarily called %allure_install_dir%
	3. Add %allure_install_dir%/bin to the PATH variables, so that we can use 'allure' command from anywhere

#### Install libraries needed for this project
	- navigate to the root folder, where contains the 'packages.json' file, then run this command:
	    $ npm install

## Build and Test
	
#### To run the tests on Chrome browser

	$ npm run test

#### View test report with Allure
	
	$ npm run allure
