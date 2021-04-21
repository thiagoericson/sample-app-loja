import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <router-outlet></router-outlet>
  `,
  preserveWhitespaces: false
})
export class AppComponent {
  title = 'sample-app-loja';
}


