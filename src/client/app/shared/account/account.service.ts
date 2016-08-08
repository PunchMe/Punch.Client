import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { ExternalLogin }  from './externalLogin';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class AccountService {
  constructor (private http: Http) {}

  private externalLoginsUrl = 'http://localhost:51639/api/Account/ExternalLogins?returnUrl=%2F&generateState=true';  // URL to web API
  
  getAuthProviders (): Observable<ExternalLogin[]> {
    return this.http.get(this.externalLoginsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    let result = new ExternalLogin();
    result.name = body.data.Name;
    result.url = body.data.Url;
    return result;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}