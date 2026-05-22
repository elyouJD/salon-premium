import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>© 2026 Salon - All rights reserved</p>
    </footer>
  `,
  styles: [
    `
      .footer {
        text-align: center;
        padding: 20px;
        background: #0a0231;
        color: white;
        margin-top: 40px;
      }
    `,
  ],
})
export class FooterComponent {}
