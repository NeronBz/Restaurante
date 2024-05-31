import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public sidebarItems = [
    { label: 'Home', url: 'home' },
    { label: 'Productos', url: 'products' },
    { label: 'Recetas', url: 'recipes' },
    { label: 'Carrito', icon: 'bi bi-cart2-fill', url: 'cart' },
  ];
}
