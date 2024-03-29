import { Injectable } from '@angular/core';
import {Curso} from "../model/curso";
import {HttpClient} from "@angular/common/http";
import {delay, first, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  API_URL = 'http://localhost:8080/api/cursos';

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Curso[]>(this.API_URL).pipe(first());
  }

  create(curso: Partial<Curso>){
    return this.http.post<Curso>(this.API_URL, curso).pipe(first());
  }

  getCursoById(id: any){
    return this.http.get<Curso>(`${this.API_URL}/${id}`).pipe(first());
  }

  update(curso: Curso){
    return this.http.put<Curso>(`${this.API_URL}/${curso.id}`, curso).pipe(first());
  }

  save(curso: Curso){
    console.log(curso)
    if(curso.id) return this.update(curso);
    return this.create({dsNome: curso.dsNome, nmCategory: curso.nmCategory});
  }

  delete(id: number){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  }

}
