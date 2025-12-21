import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  signupForm!: FormGroup; // 👈 definite assignment
 

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
     this.signupForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['student']
  });
  }

  signup() {
    if (this.signupForm.invalid) return;

    const payload = this.signupForm.getRawValue();

    this.auth.signup(payload).subscribe({
      next: () => {
        alert('Signup successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Signup failed');
      }
    });
  }
}
