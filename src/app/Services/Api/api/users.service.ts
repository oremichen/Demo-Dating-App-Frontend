/**
 * My EmployeeManagementAPI
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CreateUsersDto } from '../model/createUsersDto';
import { LoginUser } from '../model/loginUser';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';
import { MembersDto } from '../model/membersDto';



@Injectable()
export class UsersService {

    protected basePath = ServiceUrlConnections.serviceUrl;
    public configuration = new Configuration();
    public defaultHeaders = new HttpHeaders();
    // public defaultHeaders =  new HttpHeaders({
    //         Authorization: 'Bearer '+ JSON.parse(localStorage.getItem('user')).userDto.token
    //     })
       
    
    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/Users/CreateNewUser`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    
    public apiUsersGetAllUsersGet(observe?: 'body', reportProgress?: boolean): Observable<any> {
        let headers = this.defaultHeaders;
        return this.httpClient.request<any>('get',`${this.basePath}/api/Users/GetAllUsers`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public updateUserPut(body?: MembersDto, observe?: 'body', reportProgress?: boolean): Observable<string> {
        let headers = this.defaultHeaders;
        return this.httpClient.request<string>('put',`${this.basePath}/api/Users/UpdateUser`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiUsersGetUserByIdGet(id?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiUsersGetUserByIdGet(id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiUsersGetUserByIdGet(id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiUsersGetUserByIdGet(id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        console.log(headers)
        return this.httpClient.request<any>('get',`${this.basePath}/api/Users/GetUserById`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiUsersLoginPost(body?: LoginUser, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiUsersLoginPost(body?: LoginUser, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiUsersLoginPost(body?: LoginUser, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiUsersLoginPost(body?: LoginUser, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/Users/Login`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
