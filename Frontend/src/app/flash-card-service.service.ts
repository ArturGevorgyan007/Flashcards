import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Flashcard } from './Interfaces/Flashcard';


@Injectable({
  providedIn: 'root'
})
export class FlashCardServiceService {

  constructor(private httpClient: HttpClient) { }

  root : string = "https://flashcardsapi.azurewebsites.net/"

  getAllFlashCards() {
    return this.httpClient.get(this.root+"flashcard/showall");
  }
  
  addFlashCard(flashcard: Flashcard): Observable<any> {
    return this.httpClient.post(this.root+"flashcard/create", flashcard, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  editFlashCard(flashcard: Flashcard): Observable<any> {
    return this.httpClient.put(this.root + "flashcard/update", flashcard, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
  }

  deleteFlashCard(flashcard: Flashcard): Observable<any> {
    return this.httpClient.delete(this.root+"flashcard/delete", {
      headers: new HttpHeaders({ "Content-Type": "application/json" }), body: flashcard
    })
  }

  getFlashCard(id: number) {
    return this.httpClient.get(this.root + id);
  }

  getIdByQuestion(q: string) {
    return this.httpClient.get(this.root + q);
  }
}
