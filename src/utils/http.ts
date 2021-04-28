import { store } from "../data/store";
import { stringify } from "querystring";
import { ajax, AjaxError } from "rxjs/ajax";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { history } from "../index";

const baseUrl = "https://localhost:5001/api";

class HttpWrapper {
  private _header = {
    "Content-Type": "application/json" as string | undefined,
  };

  private _getHeader(disableDefaultContentType?: boolean, current?: {}) {
    const authInfo = store.getState().auth;
    let resHeaders: any = {};
    if (!disableDefaultContentType) {
      resHeaders = { ...resHeaders, ...this._header };
    }
    if (authInfo.isAuth) {
      resHeaders = { ...resHeaders, Authorization: "Bearer " + authInfo.token };
    }
    resHeaders = { ...resHeaders, ...current };

    return resHeaders;
  }

  private _getUrl(url: string, params?: { [key: string]: any }) {
    return params != null
      ? `${baseUrl}/${url}?${stringify(params)}`
      : `${baseUrl}/${url}`;
  }

  private _handleErrors(e: AjaxError) {
    switch (e.status) {
      case 401:
        history.push("/login");
        break;
      case 403:
        history.push("/accessdenied");
        break;
      case 404:
        history.push("/notfound");
        break;
    }
  }

  public get<T>(
    url: string,
    params?: { [key: string]: any },
    header?: {},
    disableDefaultContentType?: boolean
  ): Observable<T> {
    return ajax
      .get(
        this._getUrl(url, params),
        this._getHeader(disableDefaultContentType, header)
      )
      .pipe(map((x) => x.response));
  }

  public post<T>(
    url: string,
    data: {},
    params?: { [key: string]: any },
    header?: {},
    disableDefaultContentType?: boolean
  ): Observable<T> {
    return ajax
      .post(
        this._getUrl(url, params),
        data,
        this._getHeader(disableDefaultContentType, header)
      )
      .pipe(
        map((x) => x.response),
        catchError((err: AjaxError) => {
          this._handleErrors(err);
          throw err;
        })
      );
  }

  public put<T>(
    url: string,
    data: {},
    params?: { [key: string]: any },
    header?: {},
    disableDefaultContentType?: boolean
  ): Observable<T> {
    return ajax
      .put(
        this._getUrl(url, params),
        data,
        this._getHeader(disableDefaultContentType, header)
      )
      .pipe(
        map((x) => x.response),
        catchError((err: AjaxError) => {
          this._handleErrors(err);
          throw err;
        })
      );
  }

  public delete<T>(
    url: string,
    params?: { [key: string]: any },
    header?: {},
    disableDefaultContentType?: boolean
  ): Observable<T> {
    return ajax
      .delete(
        this._getUrl(url, params),
        this._getHeader(disableDefaultContentType, header)
      )
      .pipe(
        map((x) => x.response),
        catchError((err: AjaxError) => {
          this._handleErrors(err);
          throw err;
        })
      );
  }
}

export const http = new HttpWrapper();
