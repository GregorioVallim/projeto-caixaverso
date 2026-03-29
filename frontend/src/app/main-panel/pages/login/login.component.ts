import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCard } from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatCard, MatCardModule, MatFormField, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);

  onSubmit() {
    if (!this.authService.login(this.email, this.password)) {
      this.errorMessage = 'Login ou senha incorretos!';
    }
  }


}
