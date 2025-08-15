import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  topPos = 72; // distancia desde arriba
leftPos = 16; // distancia desde la izquierda

  isOpen = false;
  btnIsMobile = false;
  innerWidth: number = window.innerWidth;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    // Al iniciar: abierto en desktop, cerrado en mobile
    this.isOpen = this.innerWidth >= 768;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = (event.target as Window).innerWidth;

    if (this.innerWidth >= 768) {
      this.isOpen = true; // desktop siempre abierto
    } else {
      console.log('cierra');
      this.btnIsMobile = true;
      this.isOpen = false; // mobile empieza cerrado
    }
  }





}
