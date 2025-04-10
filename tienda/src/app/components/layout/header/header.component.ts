import { Component } from '@angular/core';
import { LucideAngularModule, FileIcon, Menu, LogIn } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [LucideAngularModule],
})
export class HeaderComponent {
  readonly Menu = Menu;
  readonly LogIn = LogIn;
  readonly FileIcon = FileIcon;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
