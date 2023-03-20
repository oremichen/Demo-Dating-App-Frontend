import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';
import { MessageDto } from '../model/messageDto';
import { MessageParams } from '../model/messageParams';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  protected basePath = ServiceUrlConnections.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  public getMessageThread(currentUserId: number, recepientId: number): Observable<MessageDto[]> {
    return this.httpClient.get<MessageDto[]>(this.basePath + `/api/message/messageThread/${currentUserId}/${recepientId}`)
  }

  public addMessage(message: MessageDto): Observable<any>{
    return this.httpClient.post<any>(this.basePath + '/api/message/add', message)
  }

  public getUserMessages(messageParams: MessageParams): Observable<MessageDto[]>{
    let params = new HttpParams().set('Username', messageParams.username)
                                 .set('Container', messageParams.container);
    return this.httpClient.get<MessageDto[]>(this.basePath + '/api/message/messages', {params})
  }
}
