# Conviction Vacation

[![Build Status](https://github.com/openseattle/convictionvacation/workflows/Build/badge.svg)](https://github.com/openseattle/convictionvacation/actions)
[![Deployment Status](https://github.com/openseattle/convictionvacation/workflows/Deployment/badge.svg)](http://openseattle.org/convictionvacation/)

Automating conviction vacation in King County.

## Table of Contents

- [About the Project](#about-the-project)
    - [Our Mission](#our-mission)
- [Built With](#built-with)
- [Getting Started](#getting-started)
    - [Installation](#installation)
- [Development Setup](#dev-setup)
- [Build](#build)
- [Learn More](#learn-more)
- [Contributing](#contributing)
- [Get In Contact](#get-in-contact)

## About The Project
One in four Washingtonians have been involved in the criminal justice system.  Those with a criminal record face
significant barriers to daily life after completing their prison terms, making it harder to find housing and
employment, to gain professional credentials, and to be involved in the life of their community.

[Washington State’s New Hope Act](https://app.leg.wa.gov/billsummary?BillNumber=2890&Year=2017) makes it easier for people with past criminal records to have their convictions
vacated.  Yet the system is slow and inefficient.  We have identified opportunities to use technology to streamline
this process, and want to explore which of these technological possibilities would make the most sense to prototype,
given user needs and volunteer resources.

## Our Mission
To benefit individuals with criminal convictions and decrease lifelong “collateral consequences.”  We have identified the first product we hope to ship to the KCBA to help automate the process for record clearance (a pain point and manual process for lawyers): a conviction eligibility calculator.  

We look forward to collaborating with you.  


## Development Setup
Currently the entire system is a single page application that runs on
[GitHub Pages](https://openseattle.github.com/convictionvacation) and uses React. In this future this may change as we
add more features and develop the system further but this works well for now.

In the project directory, you can run:

1. Ensure you have `nodejs` installed on your machine using whatever system package manager, on Mac using [homebrew](https://brew.sh) run:

    ```
    brew install nodejs
    ```
1. Install project dependecies

    ```
    npm install
    ```
1. Start the app in development mode

    ```
    npm start
    ```
1. Visit [http://localhost:3000](http://localhost:3000) to view it in the browser

### Development Environment with Docker
A developer workflow using Docker can be done by building the image locally or pulling from Docker Hub.

This image should be for development only and should not be used in production.

1. Ensure you have `docker` installed on your machine. Refer to the [Docker install instructions](https://docs.docker.com/install/) for more information.

1. Pull the image from Docker Hub

   ```
   docker pull openseattle/convictionvacation:0.0.1
   ```

1. Test that this image works on your machine - run the image and expose port 3000

   ```
   docker run -p 3000:3000 openseattle/convictionvacation:0.0.1
   ```

   Note: Environment variables can be added with a `-e` flag for [advanced configurations](https://create-react-app.dev/docs/advanced-configuration/)

1. Visit [http://localhost:3000](http://localhost:3000) to view it in the browser

1. Once you've verified this image will work, shut down the container by hitting `Ctl-C` in the active terminal window or viewing all running containers with `docker ps -a` then `docker stop <container_name>`

1. To enable hot reloading, regenerate `node_modules` and run the image with your local repo mounted into the container.   

   ```
   cd /path/to/convictionvacation
   docker run -v `pwd`:/root -p 3000:3000 openseattle/convictionvacation:0.0.1 npm install # this command will likely take a minute 
   docker run -v `pwd`:/root -p 3000:3000 openseattle/convictionvacation:0.0.1
   ```
   
   Note: Windows users will need to escape the path (See this [comment](https://github.com/moby/moby/issues/24029#issuecomment-250412919). The commands may take a few minutes.
   
   ```
   docker run -v //$(pwd):/root -p 3000:3000 openseattle/convictionvacation:0.0.1 npm install
   docker run -v //$(pwd):/root -p 3000:3000 openseattle/convictionvacation:0.0.1
   ```

[Further React Documentation](docs/react.md)

### Other Commands

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Running commands inside a Docker container

Confirm the Docker container is running `docker ps -a`.

The output should show the container status:
```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                       PORTS                    NAMES
d38d26e6cd69        test:latest         "docker-entrypoint.s…"   12 seconds ago      Up 11 seconds                0.0.0.0:3000->3000/tcp   blissful_meitner
```

Under `NAMES` generated by docker, find the running container and open a shell:

```
docker exec -it blissful_meitner /bin/sh
```

## License 

Distributed under the MIT License. See [LICENSE](https://github.com/openseattle/convictionvacation/blob/master/LICENSE) for more information.
