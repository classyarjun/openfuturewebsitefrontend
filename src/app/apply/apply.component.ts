import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyService } from 'src/service/apply.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {

  applyForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private applyService: ApplyService) {
    // Initialize form using FormBuilder
    this.applyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      location: ['', Validators.required],

      admin: { id: 1 }  // Send the admin ID here, if needed
    });
  }

  ngOnInit(): void {}

  // Handle file selection
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // On form submit
  onSubmit(): void {
    if (this.applyForm.invalid) {
      return;  // Prevent submission if form is invalid
    }

    const formData = new FormData();
    // Append the form data
    formData.append('formData', JSON.stringify(this.applyForm.value));

    // Append the CV file if it is selected
    if (this.selectedFile) {
      formData.append('cv', this.selectedFile, this.selectedFile.name);
    }

    console.log('Form data being sent:', formData);

    console.log('cv',this.selectedFile);

    // Call the service to send the form data
    this.applyService.saveForm(formData).subscribe(
      response => {
        console.log('Form submitted successfully', response);
      },
      error => {
        console.error('Error submitting form', error);
        console.log('Error response body', error.error);
      }
    );
  }
}
