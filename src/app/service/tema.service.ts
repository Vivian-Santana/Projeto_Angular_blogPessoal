import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Tema[]>{  //[] arrray por que são vários temas
    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token)
  }

  postTema(tema: Tema): Observable<Tema>{//tema único (sem []) nesse caso (post) porque vai postar um tema por vez.
    return this.http.post<Tema>('http://localhost:8080/tema', tema, this.token)
  }//no typescript quando apertar em publicar o obj tema é mandado pra cá e ele é registrado nesse endpoint http://localhost:8080/tema.
    
}
