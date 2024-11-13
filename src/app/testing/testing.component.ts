import { ContactService } from './../../service/contact.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/modal/contact';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent  implements OnInit {

  contacts: Contact[] = [];  // Store fetched data here

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        console.log('Contacts fetched:', data);
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}
