import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {

  users: any[] = []; // Lista de usuarios obtenidos
  selectedUser: any; // Usuario seleccionado

  constructor(
    private FirestoreService: FirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.FirestoreService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSelectUser(user: any): void {
    this.selectedUser = user;
  }

  async updateUser(): Promise<void> {
    if (this.selectedUser) {
      const confirmAlert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de actualizar este usuario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Actualizar',
            handler: async () => {
              try {
                await this.FirestoreService.updateUser(this.selectedUser.id, this.selectedUser);
                console.log('Usuario actualizado exitosamente');
                this.presentAlert('Éxito', 'Usuario actualizado exitosamente');
                // Actualizar la lista de usuarios o realizar alguna acción adicional si es necesario
              } catch (error) {
                console.error('Error al actualizar el usuario', error);
                this.presentAlert('Error', 'Hubo un problema al actualizar el usuario');
              }
            }
          }
        ]
      });

      await confirmAlert.present();
    }
  }

  async deleteUserFromFirebase(): Promise<void> {
    if (this.selectedUser) {
      const confirmAlert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de eliminar este usuario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Eliminar',
            handler: async () => {
              try {
                await this.FirestoreService.deleteUser(this.selectedUser.id);
                console.log('Usuario eliminado exitosamente');
                this.selectedUser = null; // Limpiar el usuario seleccionado después de eliminarlo
                this.presentAlert('Éxito', 'Usuario eliminado exitosamente');
              } catch (error) {
                console.error('Error al eliminar el usuario', error);
                this.presentAlert('Error', 'Hubo un problema al eliminar el usuario');
              }
            }
          }
        ]
      });

      await confirmAlert.present();
    }
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}