import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { Observable }                                        from 'rxjs';
import { CreateUsersDto } from '../model/createUsersDto';
import { LoginUser } from '../model/loginUser';
import { BASE_PATH }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';
import { UpdateMembersDto } from '../model/updateMembersDto';
import { Members } from '../model/members';
import { map, take } from 'rxjs/operators';
import { Responses } from '../model/response';
import { PagenatedResult } from '../model/pagenation';
import { UserParams } from '../model/userParams';
import { AuthenticationService } from './authentication.service';
import { UserDto } from '../model/userDto';



@Injectable()
export class UsersService {

    members: Members[]=[]
    pagenatedResult: PagenatedResult<Members[]> = new PagenatedResult<Members[]>()
    memberCache = new Map();
    userParams: UserParams;
    user: UserDto;

    protected basePath = ServiceUrlConnections.serviceUrl;
    public configuration = new Configuration();
    public defaultHeaders = new HttpHeaders();
    // public defaultHeaders =  new HttpHeaders({
    //         Authorization: 'Bearer '+ JSON.parse(localStorage.getItem('user')).userDto.token
    //     })
       
    
    constructor(private httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration, public authenticationService: AuthenticationService) {

        this.authenticationService.currentUser$.pipe(take(1)).subscribe(user=>{
            this.user = user
            this.userParams = new UserParams(user);
          })
          
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    getUserParams(){
        return this.userParams
    }

    setUserParams(userParams: UserParams){
        this.userParams = userParams
    }

    resetUserParams(){
        if(this.user){
            this.userParams = new UserParams(this.user)
            return this.userParams
        }

        return this.userParams
    }

    public updateUserPut(member: UpdateMembersDto): Observable<string> {
        return this.httpClient.put<string>(this.basePath + '/api/Users/UpdateUser', member)
    }

    like(userId: number, likedBy: number): Observable<any>{
        return this.httpClient.post<any>(this.basePath + `/api/Users/${userId}/${likedBy}`,{})
    }

    getLikedUsers(predicate: string, id: number){
        return this.httpClient.request<any>('get',`${this.basePath}/api/Users/${predicate},/${id}`)
    }
   
    apiUsersGetUserByIdGet(id: number){
        let params = new HttpParams().set('id', id.toString());
        const member = [...this.memberCache.values()]
        return this.httpClient.request<any>('get',`${this.basePath}/api/Users/GetUserById`, {params})
     }

     public apiUsersGetAllUsersGet(userParams: UserParams, Id: number): Observable<any> {

        // const response = this.memberCache.get(Object.values(userParams).join('-'))

        // if(response) return of(response)

       let params = this.getPaginationheaders(userParams.pageNumber, userParams.pageSize)

        params = params.append('minAge', userParams.minAge.toString());
        params = params.append('maxAge', userParams.maxAge.toString())
        params = params.append('gender', userParams.gender)
        params = params.append('orderBy', userParams.orderBy)


        return this.httpClient.request<any>('get',`${this.basePath}/api/Users/GetAllUsers/${Id}`, {observe:'response', params}).pipe(
            map(response=>{
                this.pagenatedResult.result = response.body
                if(response.headers.get('Pagination')!== null){
                    this.pagenatedResult.pagenation = JSON.parse(response.headers.get('Pagination'))
                }
                
                //this.memberCache.set(Object.values(userParams).join('-'), this.pagenatedResult)
                return this.pagenatedResult
            })
        )
    }
    
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe?: 'body', reportProgress?: boolean): Observable<Responses>;
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Responses>>;
    public apiUsersCreateNewUserPost(body?: CreateUsersDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Responses>>;
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

        return this.httpClient.request<Responses>('post',`${this.basePath}/api/Users/CreateNewUser`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
                
            }
        );
    }

  

    
     public apiUsersUpdateUserPut(body?: UpdateMembersDto, observe?: 'body', reportProgress?: boolean): Observable<string>;
     public apiUsersUpdateUserPut(body?: UpdateMembersDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
     public apiUsersUpdateUserPut(body?: UpdateMembersDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
     public apiUsersUpdateUserPut(body?: UpdateMembersDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
 
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
             'application/json',
             'text/json',
             'application/_*+json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
        
         return this.httpClient.request<string>('put',`${this.basePath}/api/Users/UpdateUser`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         ).pipe(map((res)=>{
             
             let member = this.convertmemberModel(body)
            const index = this.members.indexOf(member)
            this.members[index] = member
         }));
     }

    


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


    convertmemberModel(model: UpdateMembersDto): Members{
        let member: Members={}
        member.city = model.city
        member.id = model.id
        member.name = model.name
        member.dateCreated = model.dateCreated
        member.knownAs= model.knownAs
        member.lastAcvtive = model.lastAcvtive
        member.gender = model.gender
        member.introduction = model.introduction
        member.lookingFor = model.lookingFor
        member.interests = model.interests
        member.dateOfBirth = model.dateOfBirth
        return member
     }

     private getPaginationheaders(pageNumber: number, pageSize: number){
        let params = new HttpParams();
            params = params.append('pageNumber', pageNumber.toString())
            params = params.append('pageSize', pageSize.toString())
            return params 
    }

}
