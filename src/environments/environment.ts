// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const API_URL = "http://localhost:1000/";

export const environment = {
  
  // let URL= API_URL,
  production: false,
  emlList : API_URL+'emlList', //http://localhost:1000/emlList
  hello : API_URL+'hello', //http://localhost:1000/hello
  try : API_URL+'try'  //http://localhost:1000/try
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
