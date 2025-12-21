import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  error = '';
  loginForm!: FormGroup;
  isCheckingLogin = true; // 🔹 flag for flicker

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // 🔹 Check login status first
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getUserRole();
      if (role === 'admin') this.router.navigate(['/admin']);
      else if (role === 'teacher') this.router.navigate(['/teacher']);
      else this.router.navigate(['/student']);
    } else {
      // 🔹 show login form only after check
      this.isCheckingLogin = false;
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) return;

    const payload = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.auth.login(payload).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);

        const role = this.auth.getUserRole();

        if (role === 'admin') this.router.navigate(['/admin']);
        else if (role === 'teacher') this.router.navigate(['/teacher']);
        else this.router.navigate(['/student']);
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
