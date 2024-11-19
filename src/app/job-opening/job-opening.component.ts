import { Component } from '@angular/core';
import { Job } from 'src/modal/job';
import { JobService } from 'src/service/job.service';

@Component({
  selector: 'app-job-opening',
  templateUrl: './job-opening.component.html',
  styleUrls: ['./job-opening.component.css']
})
export class JobOpeningComponent {


  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  currentJobs: Job[] = [];
  filters = {
    remote: false,
    hybrid: false,
    office: false,
    experience: '', // e.g., '0-2 years'
    salary: ''      // e.g., '1' for 1-3 LPA
  };
  currentPage = 1;
  totalPages = 1;
  pageSize = 5;
  pages: number[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredJobs = this.jobs.filter(job =>
      this.filterByWorkModel(job) &&
      this.filterByExperience(job) &&
      this.filterBySalary(job)
    );
    this.updatePagination();
  }

  filterByWorkModel(job: Job): boolean {
    const workModel = job.workModel.toLowerCase();
    if (this.filters.remote) return workModel === 'remote';
    if (this.filters.hybrid) return workModel === 'hybrid';
    if (this.filters.office) return workModel === 'work from office';

    // If no filter is selected, include all jobs
    return true;
  }

  filterByExperience(job: Job): boolean {
    if (!this.filters.experience) return true;

    const [minExp, maxExp] = this.filters.experience.split('-').map(str => parseInt(str, 10));
    const jobExp = this.parseExperience(job.experience);
    return jobExp >= minExp && (!maxExp || jobExp <= maxExp);
  }

  parseExperience(experience: string): number {
    // Extract numerical years from experience string (e.g., "2-3 years")
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  filterBySalary(job: Job): boolean {
    if (!this.filters.salary) return true; // If no salary filter is selected, include all jobs.

    const salaryRanges: Record<string, [number, number]> = {
        '1': [100000, 300000],  // 1-3 LPA
        '2': [300000, 500000],  // 3-5 LPA
        '3': [500000, 700000],  // 5-7 LPA
        '4': [700000, 800000]   // 7-8 LPA
    };

    const [minSalary, maxSalary] = salaryRanges[this.filters.salary] || [0, Infinity];
    const jobSalary = this.parseSalary(job.salary);
    return jobSalary >= minSalary && jobSalary <= maxSalary;
}




// Called when a salary filter checkbox is clicked
toggleSalaryFilter(value: string): void {
    // If already selected, deselect it by setting the filter to an empty string.
    this.filters.salary = this.filters.salary === value ? '' : value;

    // Reapply filters.
    this.applyFilters();
}


  parseSalary(salary: string): number {
    // Parse salary strings like "5-7 lakhs" to numeric (e.g., 700000)
    const match = salary.match(/(\d+)/g);
    if (match && match.length > 0) {
      return parseInt(match[match.length - 1], 10) * 100000; // Assume 'lakhs' as unit
    }
    return 0;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredJobs.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }

    this.changePage(this.currentPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.currentJobs = this.filteredJobs.slice(start, end);
  }
}
