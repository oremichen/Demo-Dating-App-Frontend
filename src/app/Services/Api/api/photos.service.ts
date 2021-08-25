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
 
 import { PhotoDto } from '../model/photoDto';
 
 import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
 import { Configuration }                                     from '../configuration';
import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';
 
 
 @Injectable()
 export class PhotosService {
 
     protected basePath = ServiceUrlConnections.serviceUrl;
     public defaultHeaders = new HttpHeaders();
     public configuration = new Configuration();
 
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
      * @param file 
      * @param id 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public apiPhotosUploadphotosAsyncPostForm(file?: Blob, id?: number, observe?: 'body', reportProgress?: boolean): Observable<PhotoDto>;
     public apiPhotosUploadphotosAsyncPostForm(file?: Blob, id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PhotoDto>>;
     public apiPhotosUploadphotosAsyncPostForm(file?: Blob, id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PhotoDto>>;
     public apiPhotosUploadphotosAsyncPostForm(file?: Blob, id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
 
 
         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
         if (id !== undefined && id !== null) {
             queryParameters = queryParameters.set('id', <any>id);
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'text/plain',
             'application/json',
             'text/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'multipart/form-data'
         ];
 
         const canConsumeForm = this.canConsumeForm(consumes);
 
         let formParams: { append(param: string, value: any): void; };
         let useForm = false;
         let convertFormParamsToString = false;
         // use FormData to transmit files using content-type "multipart/form-data"
         // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
         useForm = canConsumeForm;
         if (useForm) {
             formParams = new FormData();
         } else {
             formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
         }
 
         if (file !== undefined) {
             formParams = formParams.append('file', <any>file) as any || formParams;
         }
 
         return this.httpClient.request<PhotoDto>('post',`${this.basePath}/api/Photos/UploadphotosAsync`,
             {
                 body: convertFormParamsToString ? formParams.toString() : formParams,
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
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiPhotosDeletePhotoDelete(id?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiPhotosDeletePhotoDelete(id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiPhotosDeletePhotoDelete(id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiPhotosDeletePhotoDelete(id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/Photos/DeletePhoto`,
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
     * @param id 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiPhotosSetMainPhotoPut(id?: number, userId?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiPhotosSetMainPhotoPut(id?: number, userId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiPhotosSetMainPhotoPut(id?: number, userId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiPhotosSetMainPhotoPut(id?: number, userId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/Photos/SetMainPhoto`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
 
 }
 