import { routes } from './../app.routes';
import { Component } from '@angular/core';
import { RegisterationComponent } from './registeration/registeration.component';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styles: ``,
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-in-out', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class UserComponent {
  constructor(private context: ChildrenOutletContexts) {}
  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
