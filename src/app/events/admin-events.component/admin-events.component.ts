import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { switchMap, finalize } from 'rxjs';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private eventsService = inject(EventsService);

  events: any[] = [];
  loadingEvents = false;
  submittingForm = false;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    eventDate: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadEvents();
  }

  // 🔥 SINGLE SOURCE OF DATA
  loadEvents() {
    this.loadingEvents = true;

    this.eventsService.getEvents()
      .pipe(finalize(() => this.loadingEvents = false))
      .subscribe({
        next: res => this.events = res,
        error: () => { }
      });
  }


  addEvent() {
    if (this.form.invalid) return;

    this.loadingEvents = true;

    const payload = {
      ...this.form.value,
      createdOn: new Date().toISOString()
    };

    this.eventsService.addEvent(payload).pipe(
      switchMap(() => this.eventsService.getEvents()),
      finalize(() => this.loadingEvents = false)
    ).subscribe({
      next: res => {
        this.events = res;
        this.form.reset();
      },
      error: err => console.error(err)
    });
  }


  deleteEvent(id: number) {
  if (!confirm('Are you sure?')) return;

  console.log('DELETE CLICKED', id);

  this.eventsService.deleteEvent(id).pipe(
    switchMap(() => {
      console.log('DELETE SUCCESS → CALLING GET');
      return this.eventsService.getEvents();
    })
  ).subscribe({
    next: res => {
      console.log('GET RESPONSE', res);
      this.events = res;
    },
    error: err => {
      console.error('CHAIN FAILED', err);
    }
  });
}



}
