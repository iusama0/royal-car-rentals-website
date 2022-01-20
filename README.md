## Steps to run the project [royal-car-rentals-website]

1. Clone the project using command or unzip downloaded project `git clone https://github.com/iusama0/royal-car-rentals-website.git`
2. Make sure to run [royal-car-rentals-web-api](`https://github.com/iusama0/royal-car-rentals-web-api.git`) project first
3. Check if you have installed [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.
4. Open the `royal-car-rentals-website` folder in terminal/command prompt.
5. Run the command `npm install`
6. If you face any issue due to node version, proceed according to your system. Try deleting `node_modules` folder and re-running `npm install`
7. [Optional] If you need to change the API url that can be done in `src/environments/environment.ts`, update the value of `apiUrl` variable.
8. Then run `ng serve --open`, (ignore the cli.misMatch warnings if you see one :) )
9. Application will start running in browser after successful build


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Generate Component

ng g c admin/[name]
ng g c public/[name]
ng g c driver/[name]

## Generate Service

ng g s services/[name] --skipTests

## Generate Model

ng g class Models/[name] --type=model --skipTests


