import { Component } from '@angular/core';

@Component({
  selector: 'app-job-opening',
  templateUrl: './job-opening.component.html',
  styleUrls: ['./job-opening.component.css']
})
export class JobOpeningComponent {

    roles = [
      { id: 1, name: 'Aerospace/Aviation/Airlines' },
      { id: 2, name: 'Banking/Financial Services' },
      { id: 3, name: 'Construction' },
      { id: 4, name: 'Education/Training' },
      { id: 5, name: 'Healthcare' },

    ];

    showMore = false;
    toggleShowMore() {
      this.showMore = !this.showMore;
    }


    locations = [
      { id: 1, name: 'India' },
      { id: 2, name: 'Singapore' },
      { id: 3, name: 'Malaysia' },
      { id: 4, name: 'Hong Kong' },
      { id: 5, name: 'United States' },
    ];

    showMoreLocations = false;

    toggleShowMoreLocations() {
      this.showMoreLocations = !this.showMoreLocations;
    }


  }

