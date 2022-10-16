import { Component } from '@angular/core';
import { FooterColumnComponent } from './footer-column/footer-column.component';

@Component({
  selector: 'fds-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  columns: FooterColumnComponent[] = [];
}
