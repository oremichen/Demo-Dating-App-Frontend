import { Injectable } from '@angular/core';
import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  protected basePath = ServiceUrlConnections.serviceUrl;

  constructor() { }
}
