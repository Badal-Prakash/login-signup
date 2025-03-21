import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterationComponent } from './user/registeration/registeration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'Auth';
}
