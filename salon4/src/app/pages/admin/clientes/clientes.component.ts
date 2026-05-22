import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="header">
        <h2>Clientes</h2>
        <button class="add-btn" (click)="openForm()">+ Nuevo cliente</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let c of clientes">
            <td class="user">
              <div class="avatar">{{ c.nombre[0] }}</div>
              {{ c.nombre }}
            </td>

            <td>{{ c.email }}</td>
            <td>{{ c.telefono }}</td>
            <td>{{ c.genero }}</td>

            <td>
              <button class="edit" (click)="edit(c)">✏️</button>
              <button class="delete" (click)="delete(c)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="modal" *ngIf="showForm">
        <div class="card">
          <h3>{{ editMode ? 'Editar cliente' : 'Nuevo cliente' }}</h3>

          <input [(ngModel)]="form.nombre" placeholder="Nombre" />
          <input [(ngModel)]="form.email" placeholder="Email" />
          <input [(ngModel)]="form.telefono" placeholder="Teléfono" />
          <select [(ngModel)]="form.genero">
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>

          <button (click)="save()">Guardar</button>
          <button class="cancel" (click)="close()">Cancelar</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 25px;
        background: #f4f6f9;
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
      }

      .add-btn {
        background: linear-gradient(135deg, #ff7a18, #ff512f);
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 10px;
        cursor: pointer;
      }

      table {
        width: 100%;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      }

      th {
        background: #111;
        color: white;
        padding: 15px;
      }

      td {
        padding: 14px;
        border-bottom: 1px solid #eee;
      }

      .user {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #ff512f;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      .edit {
        background: #007bff;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 6px;
      }

      .delete {
        background: red;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 6px;
      }

      .modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        display: flex;
        flex-direction: column;
      }

      input,
      select {
        margin: 5px 0;
        padding: 10px;
      }

      button {
        margin-top: 10px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .cancel {
        background: #ccc;
      }
    `,
  ],
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  showForm = false;
  editMode = false;
  selectedId: number | null = null;

  form: any = {
    nombre: '',
    email: '',
    telefono: '',
    genero: 'Hombre',
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.api.getClientes().subscribe((res: any) => {
      this.clientes = res.member;
    });
  }

  openForm() {
    this.showForm = true;
    this.editMode = false;
    this.form = {
      nombre: '',
      email: '',
      telefono: '',
      genero: 'Hombre',
    };
  }

  edit(c: any) {
    this.showForm = true;
    this.editMode = true;
    this.selectedId = c.id;
    this.form = { ...c };
  }

  // 🔥 FIX FINAL
  save() {
    const data = {
      nombre: this.form.nombre,
      email: this.form.email,
      telefono: this.form.telefono,
      genero: this.form.genero,
    };

    // CREATE
    if (!this.editMode) {
      this.api.addCliente(data).subscribe({
        next: () => this.loadClientes(),
        error: (err) => console.log('CREATE ERROR', err),
      });
    }

    // UPDATE (FIXED)
    else {
      this.api.updateCliente(this.selectedId!, data).subscribe({
        next: () => this.loadClientes(),
        error: (err) => console.log('UPDATE ERROR', err),
      });
    }

    this.close();
  }

  delete(c: any) {
    this.api.deleteCliente(c.id).subscribe(() => {
      this.clientes = this.clientes.filter((x) => x.id !== c.id);
    });
  }

  close() {
    this.showForm = false;
  }
}
