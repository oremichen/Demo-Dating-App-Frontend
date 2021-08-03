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

 import { Injectable }                      from '@angular/core';
 import { HttpClient, HttpHeaders }                           from '@angular/common/http';
 import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';
 
 

 
  var httptoken
 
 @Injectable({
    providedIn:'root'
 })
 
 export class MembersService {
     protected basePath = ServiceUrlConnections.serviceUrl;
     public defaultHeaders = new HttpHeaders();

     public httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer '+ JSON.parse(localStorage.getItem('user')).userDto.token
        })
       
    }
     
     constructor(protected httpClient: HttpClient) {
       //httptoken= JSON.parse(localStorage.getItem('user')).userDto.token
     }
 
     
     getAllMembers(){
         
         const header = this.httpOptions
         console.log(header)
        return this.httpClient.get(`${this.basePath}/api/Users/GetAllUsers`)
     }
    
     
     getMemberById(id: number){
       // return this.httpClient.get(`${this.basePath}/api/Users/GetUserById/` + id, httpOptions)
     }
 }
 