import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse,HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { TimeoutError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  constructor(private http: HttpClient, private router: Router) { }

  get(url:any,data:any,headers:any){
    var headersObj = new HttpHeaders();
    if(headers.contentType){
      headersObj = headersObj.set('content-type', headers.contentType);
    } else{
      headersObj.append('Content-Type', 'application/json');
    }
    let options = {
      params: (data != null && data.params != null) ?  new HttpParams({ fromObject: data.params }) : {},
      headers : headersObj
    };
    return this.http.get<any>(url,options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        this.handleError(err);
        console.log(err.status)
        if (err.status == 400) {
          localStorage.removeItem('Token')
          localStorage.removeItem('userType')
        }
        return throwError(err);
      })
    )
  }
  // delete(url: any, data: any, headers: any) {
  //   var headersObj = new HttpHeaders();
  //   if(headers.contentType){
  //     headersObj = headersObj.set('content-type', headers.contentType);
  //   } else{
  //     headersObj.append('Content-Type', 'application/json');
  //   }
  //   let options = {
  //     params: (data != null && data.params != null) ? new HttpParams({ fromObject: data.params }) : {},
  //     headers: headersObj
  //   };
  //   return this.http.delete(url, options).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // put(url: any, data: any, headers: any) {
  //   var headersObj = new HttpHeaders();
  //   if(headers.contentType){
  //     headersObj = headersObj.set('content-type', headers.contentType);
  //   } else{
  //     headersObj.append('Content-Type', 'application/json');
  //   }

  //   return this.http.put(url, data, { headers: headersObj, observe: 'response' }).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  post= (url:any, data:any, headers : any)=>{
    var headersObj = new HttpHeaders();
    if(headers.contentType){
      headersObj = headersObj.set('content-type', headers.contentType);
    } else{
      headersObj.append('Content-Type', 'application/json');
    }
    return this.http.post<any>(url, data, {headers : headersObj}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log('err.status',err.status)
        this.handleError(err);
        if (err.status == 400) {
          console.log(err.error.details)
          // localStorage.removeItem('Token')
          // localStorage.removeItem('userType')
        }
        return throwError(err);
      })
    )
  }
 

  handleError = (error: HttpErrorResponse) =>{ //
    console.log('error',error);
    if (error instanceof TimeoutError) {
      console.log("Api failed to get data. Automatic timout.");
   }

    if (error.status === 401) {
      if(error.error.details){
        console.log(error.error.details);
      } else{
      // this.notificationService.showError("Your session Expired due to inactivity.");
      }
      console.log('An 401 error occurred:', error.error);
      localStorage.removeItem('Token')
      localStorage.removeItem('userType')
      this.router.navigate(['/']);
    }else if (error.status === 403) {
      // this.messageService.sendMessage('refreshJwtToken',{});
      console.log('An error occurred:', error.error ? error.error : error.message);
    //  this.sessionStorage.signOut();
    //   if (this.router.url !== "/login") {
    //     window.location.reload();
    //   }
    }else if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
      if(error && error.error && error.error.message){
        console.log("Some Error Occoured ");
      }
    }
    return throwError(()=>new Error('Something bad happened; please try again later.'));
  }
}
