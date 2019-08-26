import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneReq = request.clone({
      headers: request.headers.set('Authorization', localStorage.getItem('token')?localStorage.getItem('token'):'')
    });
    return next.handle(cloneReq)
      .do((evento: HttpEvent<any>) => {
        if (evento instanceof HttpResponse) {
        }
      }).catch(resposta => {
        if (resposta instanceof HttpErrorResponse) {
        }

        return Observable.throw(resposta);
      });
  }
}
