import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private postCommentsUrl = `${environment.baseUrl}comentarios`;
  private getCommentsUrl = `${environment.baseUrl}productos/{idProducto}/comentarios`;
  private putCommentsUrl = `${environment.baseUrl}comentarios/{id}`;

  constructor(private http: HttpClient) {}

  getComments(idProducto: number): Observable<any[]> {
    const url = this.getCommentsUrl.replace(
      '{idProducto}',
      idProducto.toString()
    );
    return this.http.get<any[]>(url);
  }

  postComment(comment: {
    idUsuario: number;
    idProducto: number;
    comentario: string;
    calificacion: number;
  }): Observable<any> {
    return this.http.post<any>(this.postCommentsUrl, comment);
  }

  putComment(
    id: number,
    comment: { comentario: string; calificacion: number }
  ): Observable<any> {
    const url = this.putCommentsUrl.replace('{id}', id.toString());
    return this.http.put<any>(url, comment);
  }
}
