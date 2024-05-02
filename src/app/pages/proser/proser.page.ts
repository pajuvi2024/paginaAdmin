import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-proser',
  templateUrl: './proser.page.html',
  styleUrls: ['./proser.page.scss'],
})
export class ProserPage implements OnInit {
  searchText: string = '';
  foundUsers: any[] = [];
  selectedUser: any; // Usuario seleccionado

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
  }

  onSelectUser(user: any): void {
    this.selectedUser = user;
  }

  performSearch() {
    if (this.searchText.trim()) {
      this.firestoreService.searchByName(this.searchText.trim()).subscribe(
        (data) => {
          this.foundUsers = data;
          if (this.foundUsers.length === 0) {
            console.log("No se encontraron usuarios con ese nombre.");
          }
        },
        (error) => {
          console.error('Error al buscar usuarios:', error);
        }
      );
    } else {
      console.log("Por favor, ingresa un nombre para buscar.");
    }
  }
}
