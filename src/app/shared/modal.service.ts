import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  showModal(name) {
    const modal = document.getElementById(name);
    modal.classList.remove('hidden');
    modal.classList.add('show');
  }

  closeModal(name) {
    const modal = document.getElementById(name);
    modal.classList.remove('show');
    modal.classList.add('hidden');
  }
}
