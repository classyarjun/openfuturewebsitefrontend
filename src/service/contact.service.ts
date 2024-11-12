import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Contact } from 'src/modal/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private apiUrl = 'http://localhost:8080/api/contacts'; // Adjust if needed

  constructor(private http: HttpClient) {}

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/save`, contact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/all`);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/getById/${id}`);
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/Update/${id}`, contact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`);
  }
}






