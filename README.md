# Todo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## 내려받기, 설치, 빌드, 실행

* 콘솔 창-1을 열고 다음 명령을 실행합니다: 
```
git clone https://github.com/dehuvo/todo
cd todo
npm i
```
* 콘솔 창-2를 열고 todo 폴더에서 다음 명령을 실행합니다: 
```
npm i -g http-server
npm i -g json-server
json-server db.json
```
* 콘솔 창-1에서 이어서 다음 명령을 실행합니다:
```
ng serve -o
``` 
* 콘솔 창-3을 열고 todo 폴더에서 다음 명령을 실행합니다: 
```
ng build todo --prod
cd dist
http-server -o http://localhost:8080
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
