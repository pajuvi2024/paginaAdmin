import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  data: any;
  newVideoUrl: string = '';
  safeVideoUrl: SafeResourceUrl;


  intervalId: any; // Aquí se declara la propiedad intervalId
  obtenerCoordenadasHabilitado: boolean = false; // Bandera para indicar si la obtención de coordenadas está habilitada

  paginaActual: string;
  constructor(
    private afAuth: AngularFireAuth,              
              private router: Router,              
              private sanitizer: DomSanitizer,
              private firestore: AngularFirestore,
              private toastController: ToastController,
  ) { 
    this.intervalId = null;
    this.setVideoUrl('https://www.youtube.com/embed/06Btx0To5Dk?si=VCHegdQTOAMDSOCY');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url.split('/main')[1]; // Obtener el segmento de la URL
        this.paginaActual = url || 'buscar'; // Si la URL está vacía, establecer 'buscar' como valor predeterminado
      }
    });
  }

  ngOnInit() {
  }



  setVideoUrl(url: string) {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  changeVideo() {
    const videoId = this.extractVideoId(this.newVideoUrl);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      this.setVideoUrl(embedUrl);
    } else {
      console.error('No se pudo extraer el ID del video de la URL proporcionada.');
    }
  }

  extractVideoId(url: string): string | null {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }


}
