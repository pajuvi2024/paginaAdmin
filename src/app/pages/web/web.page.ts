import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web',
  templateUrl: './web.page.html',
  styleUrls: ['./web.page.scss']
})
export class WebPage implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.clear();
  }


  
}
