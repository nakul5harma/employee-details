import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { catchError, map, filter, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class LocationProviderService {
    private countryCodeUrl = 'http://api.geonames.org/countryCodeJSON';
    private countryDataUrl = 'https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json';

    constructor(private httpClient: HttpClient) {}

    public getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (resp) => {
                    resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    public getCountryCode(lat: number, lng: number): Observable<string> {
        const params = new HttpParams()
            .set('lat', lat.toString())
            .set('lng', lng.toString())
            .set('username', 'nakulsharma');

        return this.httpClient.get(this.countryCodeUrl, { params }).pipe(
            map((countryData: { languages: string; distance: string; countryCode: string; countryName: string }) => {
                return countryData.countryCode;
            }),
            catchError(this.handleError)
        );
    }

    public getCountryDialCode(countryCode: string): Observable<string> {
        return this.httpClient.get(this.countryDataUrl).pipe(
            map((countryData: Array<{ name: string; dial_code: string; code: string }>) => {
                countryData = countryData.filter((country) => {
                    return country.code === countryCode;
                });
                return countryData[0].dial_code;
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}` + `error was : ${error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }
}
