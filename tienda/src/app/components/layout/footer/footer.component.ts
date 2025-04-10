import { Component } from '@angular/core';
import { LucideAngularModule, FileIcon, Menu, LogIn } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly Menu = Menu;
  readonly LogIn = LogIn;
  readonly FileIcon = FileIcon;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
