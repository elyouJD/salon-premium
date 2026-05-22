import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="services">
      <div class="header">
        <h2>Servicios</h2>

        <button (click)="openForm()">+ Nuevo</button>
      </div>

      <!-- CARDS -->
      <div class="grid">
        <div class="card" *ngFor="let s of servicios">
          <img [src]="getImage(s)" />

          <h3>{{ s.nombre_servicio }}</h3>

          <p>{{ s.descripcion }}</p>

          <span>{{ s.costo }}€</span>

          <div class="actions">
            <button (click)="edit(s)">✏️</button>

            <button (click)="delete(s)">🗑️</button>
          </div>
        </div>
      </div>

      <!-- MODAL -->
      <div class="modal" *ngIf="showForm">
        <div class="form">
          <h3>{{ editMode ? 'Editar' : 'Nuevo servicio' }}</h3>

          <input [(ngModel)]="form.nombre_servicio" placeholder="Nombre" />

          <input [(ngModel)]="form.costo" type="number" placeholder="Precio" />

          <input [(ngModel)]="form.descripcion" placeholder="Descripción" />

          <!-- IMAGE -->
          <input type="file" (change)="onFile($event)" />

          <img *ngIf="form.imagen" [src]="form.imagen" class="preview" />

          <button (click)="save()">Guardar</button>

          <button class="cancel" (click)="close()">Cancelar</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .services {
        margin-top: 20px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
      }

      .card {
        background: white;
        border-radius: 15px;
        padding: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      }

      .card img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 10px;
      }

      .actions {
        margin-top: 10px;
      }

      .modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .form {
        background: white;
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        display: flex;
        flex-direction: column;
      }

      input {
        margin: 5px 0;
        padding: 10px;
      }

      .preview {
        width: 100%;
        height: 120px;
        object-fit: cover;
        margin-top: 10px;
        border-radius: 10px;
      }

      button {
        margin-top: 10px;
        padding: 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }

      .cancel {
        background: #ccc;
      }
    `,
  ],
})
export class ServiciosComponent implements OnInit {
  servicios: any[] = [];

  showForm = false;

  editMode = false;

  selectedId: number | null = null;

  form: any = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  // LOAD
  load() {
    this.api.getServicios().subscribe((res: any) => {
      this.servicios = res.member;
    });
  }

  // OPEN FORM
  openForm() {
    this.showForm = true;

    this.editMode = false;

    this.form = {};
  }

  // EDIT
  edit(s: any) {
    this.showForm = true;

    this.editMode = true;

    this.selectedId = s.id;

    this.form = JSON.parse(JSON.stringify(s));

    // LOAD IMAGE
    const saved = localStorage.getItem('servicio_img_' + s.id);

    if (saved) {
      this.form.imagen = saved;
    }
  }

  // FILE
  onFile(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.form.imagen = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // SAVE
  save() {
    const data = {
      nombre_servicio: this.form.nombre_servicio,
      descripcion: this.form.descripcion,
      costo: this.form.costo,
      fecha_creacion: new Date().toISOString(),
      admin: '/api/admins/1',
    };

    // ADD
    if (!this.editMode) {
      this.api.addServicio(data).subscribe((newServicio: any) => {
        // SAVE IMAGE LOCAL
        localStorage.setItem('servicio_img_' + newServicio.id, this.form.imagen || '');

        this.load();

        this.close();
      });
    }

    // UPDATE
    else {
      this.api.updateServicio(this.selectedId!, data).subscribe(() => {
        // UPDATE IMAGE LOCAL
        localStorage.setItem('servicio_img_' + this.selectedId, this.form.imagen || '');

        this.load();

        this.close();
      });
    }
  }

  // DELETE
  delete(s: any) {
    this.api.deleteServicio(s.id).subscribe(() => {
      // DELETE IMAGE
      localStorage.removeItem('servicio_img_' + s.id);

      this.load();
    });
  }

  // CLOSE
  close() {
    this.showForm = false;
  }

  // IMAGE
  getImage(servicio: any) {
    const saved = localStorage.getItem('servicio_img_' + servicio.id);

    if (saved) {
      return saved;
    }

    return 'images/img1.jpg';
  }
}
