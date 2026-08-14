import { Component, Input } from '@angular/core';

import { IconDirective } from 'espd-common/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title?: string;
  @Input() icon?: string;
}
