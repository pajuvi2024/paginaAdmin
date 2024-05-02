import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserI } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

// Método para obtener todos los usuarios
getUsers(): Observable<any[]> {
  return this.firestore.collection('usuarios').valueChanges({ idField: 'id' });
}


// Método para obtener un usuario por su ID
getUserById(userId: string): Observable<any> {
  return this.firestore.collection('usuarios').doc(userId).valueChanges({ idField: 'id' });
}


      // Actualizar un usuario existente
  updateUser(userId: string, newData: any): Promise<void> { // Cambia 'any' por el tipo de tu modelo de usuario
    return this.firestore.doc(userId).update(newData);
  }

    // Eliminar un usuario
    deleteUser(userId: string): Promise<void> {
      return this.firestore.doc(userId).delete();
    }

  // Método para crear un documento
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  // Método para obtener una colección
  getCollection() {
    console.log('Estoy por leer una coleccion');
    this.firestore.collection('Usuario').valueChanges().subscribe((res) => {
      console.log('res ->', res);
    });
  }

  // Método para obtener un documento de forma estática
  getDoc(path: string, id: string): Observable<UserI | null> {
    return this.firestore.collection(path).doc<UserI>(id).get().pipe(
      filter((snapshot: any): snapshot is DocumentSnapshot<UserI> => snapshot.exists),
      map((snapshot: DocumentSnapshot<UserI>) => {
        return { id: snapshot.id, ...snapshot.data() } as UserI;
      })
    );
  }

  // Método para obtener un documento con actualización en tiempo real
  getDocWithRealtimeUpdate<T>(path: string, id: string): AngularFirestoreDocument<T> {
    return this.firestore.doc<T>(`${path}/${id}`);
  }

  // Método para actualizar un documento
  updateDoc(docPath: string, data: any): Promise<void> {
    return this.firestore.doc(docPath).update(data);
  }

  // Método para buscar productos (como ejemplo de obtener una colección)
  buscarProductos(): Observable<any[]> {
    return this.firestore.collection('/usuarios/').valueChanges();
  }

  searchByName(name: string): Observable<any[]> {
    return this.firestore.collection('usuarios', ref => ref.where('name', '==', name))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          // Aseguramos que data es un objeto
          return { id, ...(data as object) };
        }))
      );
  }
  
}