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
          <img [src]="s.imagen || 'images/img1.jpg'" />

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
      * {
        box-sizing: border-box;
      }

      .services {
        padding: 24px;
        background: #eef2f7;
        min-height: 100vh;
      }

      /* HEADER */

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        gap: 15px;
        flex-wrap: wrap;

        margin-bottom: 25px;
      }

      .header h2 {
        margin: 0;

        font-size: 28px;
        font-weight: 700;

        color: #0f172a;
      }

      .header button {
        background: linear-gradient(135deg, #2563eb, #4f46e5);

        color: white;

        border: none;

        padding: 12px 20px;

        border-radius: 12px;

        cursor: pointer;

        font-size: 14px;
        font-weight: 600;

        transition: 0.25s;
      }

      .header button:hover {
        transform: translateY(-2px);
        opacity: 0.95;
      }

      /* GRID */

      .grid {
        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

        gap: 22px;
      }

      /* CARD */

      .card {
        background: white;

        border-radius: 22px;

        padding: 16px;

        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);

        transition: 0.3s;

        overflow: hidden;
      }

      .card:hover {
        transform: translateY(-5px);
      }

      .card img {
        width: 100%;
        height: 200px;

        object-fit: cover;

        border-radius: 16px;
      }

      .card h3 {
        margin-top: 16px;
        margin-bottom: 8px;

        color: #0f172a;

        font-size: 20px;
      }

      .card p {
        color: #64748b;

        line-height: 1.5;

        min-height: 45px;

        font-size: 14px;
      }

      .card span {
        display: inline-block;

        margin-top: 12px;

        font-size: 24px;
        font-weight: bold;

        color: #2563eb;
      }

      /* ACTIONS */

      .actions {
        margin-top: 18px;

        display: flex;

        gap: 10px;
      }

      .actions button {
        flex: 1;

        border: none;

        padding: 11px;

        border-radius: 12px;

        cursor: pointer;

        color: white;

        font-size: 15px;

        transition: 0.25s;
      }

      .actions button:hover {
        transform: scale(1.03);
      }

      .actions button:first-child {
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
      }

      .actions button:last-child {
        background: linear-gradient(135deg, #ef4444, #dc2626);
      }

      /* MODAL */

      .modal {
        position: fixed;
        inset: 0;

        background: rgba(15, 23, 42, 0.6);

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 15px;

        z-index: 999;
      }

      .form {
        background: white;

        padding: 24px;

        border-radius: 22px;

        width: 100%;
        max-width: 430px;

        display: flex;
        flex-direction: column;

        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);

        animation: fadeIn 0.25s ease;
      }

      .form h3 {
        margin-bottom: 18px;

        color: #0f172a;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      input {
        margin: 8px 0;

        padding: 13px;

        border-radius: 12px;

        border: 1px solid #dbe2ea;

        font-size: 14px;

        outline: none;

        transition: 0.2s;
      }

      input:focus {
        border-color: #2563eb;

        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
      }

      .preview {
        width: 100%;
        height: 170px;

        object-fit: cover;

        margin-top: 12px;

        border-radius: 16px;
      }

      .form button {
        margin-top: 12px;

        padding: 13px;

        border: none;

        border-radius: 12px;

        cursor: pointer;

        font-size: 14px;
        font-weight: 600;

        transition: 0.25s;
      }

      .form button:first-of-type {
        background: linear-gradient(135deg, #2563eb, #4f46e5);

        color: white;
      }

      .cancel {
        background: #e2e8f0;
        color: #0f172a;
      }

      .form button:hover {
        opacity: 0.95;
      }

      /* MOBILE */

      @media (max-width: 768px) {
        .services {
          padding: 14px;
        }

        .header {
          flex-direction: column;
          align-items: stretch;
        }

        .header button {
          width: 100%;
        }

        .grid {
          grid-template-columns: 1fr;
        }

        .card {
          padding: 14px;
        }

        .card img {
          height: 220px;
        }

        .form {
          max-width: 100%;
        }

        input {
          font-size: 16px;
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 480px) {
        .header h2 {
          font-size: 22px;
        }

        .card h3 {
          font-size: 18px;
        }

        .card span {
          font-size: 20px;
        }
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

  load() {
    this.api.getServicios().subscribe((res: any) => {
      this.servicios = res.member;
    });
  }

  openForm() {
    this.showForm = true;
    this.editMode = false;
    this.form = {};
  }

  edit(s: any) {
    this.showForm = true;
    this.editMode = true;
    this.selectedId = s.id;
    this.form = { ...s };
  }

  onFile(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.form.imagen = reader.result;
    };

    reader.readAsDataURL(file);
  }

  save() {
    const data = {
      ...this.form,
      fecha_creacion: new Date().toISOString(),
      admin: '/api/admins/1',
    };

    if (!this.editMode) {
      this.api.addServicio(data).subscribe(() => this.load());
    } else {
      this.api.updateServicio(this.selectedId!, data).subscribe(() => this.load());
    }

    this.close();
  }

  delete(s: any) {
    this.api.deleteServicio(s.id).subscribe(() => this.load());
  }

  close() {
    this.showForm = false;
  }
}
