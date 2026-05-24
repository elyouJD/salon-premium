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
      * {
        box-sizing: border-box;
      }

      .page {
        padding: 24px;
        background: #eef2f7;
        min-height: 100vh;
      }

      /* HEADER */

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 24px;

        gap: 15px;
        flex-wrap: wrap;
      }

      h2 {
        margin: 0;

        font-size: 28px;
        font-weight: 700;

        color: #0f172a;
      }

      .add-btn {
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

      .add-btn:hover {
        transform: translateY(-2px);
        opacity: 0.95;
      }

      /* TABLE */

      table {
        width: 100%;

        border-collapse: collapse;

        background: white;

        border-radius: 20px;

        overflow: hidden;

        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
      }

      thead {
        background: linear-gradient(90deg, #0f172a, #1e293b);
      }

      th {
        color: white;

        padding: 18px;

        text-align: left;

        font-size: 14px;
        font-weight: 600;
      }

      td {
        padding: 16px 18px;

        border-bottom: 1px solid #edf2f7;

        color: #334155;

        font-size: 14px;
      }

      tbody tr {
        transition: 0.2s;
      }

      tbody tr:hover {
        background: #f8fafc;
      }

      /* USER */

      .user {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .avatar {
        width: 40px;
        height: 40px;

        border-radius: 50%;

        background: linear-gradient(135deg, #2563eb, #4f46e5);

        color: white;

        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: bold;
        font-size: 15px;

        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.25);
      }

      /* BUTTONS */

      .edit,
      .delete {
        border: none;

        width: 38px;
        height: 38px;

        border-radius: 10px;

        color: white;

        cursor: pointer;

        font-size: 15px;

        transition: 0.25s;
      }

      .edit {
        background: linear-gradient(135deg, #2563eb, #1d4ed8);

        margin-right: 6px;
      }

      .delete {
        background: linear-gradient(135deg, #ef4444, #dc2626);
      }

      .edit:hover,
      .delete:hover {
        transform: scale(1.05);
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

      .card {
        background: white;

        padding: 24px;

        border-radius: 22px;

        width: 100%;
        max-width: 420px;

        display: flex;
        flex-direction: column;

        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);

        animation: fadeIn 0.25s ease;
      }

      .card h3 {
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

      input,
      select {
        margin: 8px 0;

        padding: 13px;

        border-radius: 12px;

        border: 1px solid #dbe2ea;

        font-size: 14px;

        outline: none;

        transition: 0.2s;
      }

      input:focus,
      select:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
      }

      .card button {
        margin-top: 12px;

        padding: 13px;

        border: none;

        border-radius: 12px;

        cursor: pointer;

        font-size: 14px;
        font-weight: 600;

        transition: 0.25s;
      }

      .card button:first-of-type {
        background: linear-gradient(135deg, #2563eb, #4f46e5);

        color: white;
      }

      .cancel {
        background: #e2e8f0;
        color: #0f172a;
      }

      .card button:hover {
        opacity: 0.95;
      }

      /* MOBILE */

      @media (max-width: 900px) {
        .page {
          padding: 14px;
        }

        table,
        tbody,
        tr,
        td {
          display: block;
          width: 100%;
        }

        thead {
          display: none;
        }

        tr {
          background: white;

          margin-bottom: 18px;

          border-radius: 18px;

          padding: 16px;

          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        }

        td {
          border: none;

          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 10px;

          padding: 12px 0;

          font-size: 14px;
        }

        td::before {
          font-weight: 700;
          color: #0f172a;
        }

        td:nth-child(1)::before {
          content: 'Cliente';
        }

        td:nth-child(2)::before {
          content: 'Email';
        }

        td:nth-child(3)::before {
          content: 'Teléfono';
        }

        td:nth-child(4)::before {
          content: 'Género';
        }

        td:nth-child(5)::before {
          content: 'Acciones';
        }

        .card {
          max-width: 100%;
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 480px) {
        h2 {
          font-size: 22px;
        }

        .header {
          flex-direction: column;
          align-items: stretch;
        }

        .add-btn {
          width: 100%;
        }

        td {
          flex-direction: column;
          align-items: flex-start;
        }

        td::before {
          margin-bottom: 4px;
        }
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

  /*loadClientes() {
    this.api.getClientes().subscribe((res: any) => {
      this.clientes = res.member;
    });
  }*/
  loadClientes() {
    this.api.getClientes().subscribe({
      next: (res: any) => {
        this.clientes = res.member || res;
      },

      error: (err) => {
        console.log('ERROR CLIENTES', err);
        this.clientes = [];
      },
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

  /*delete(c: any) {
    this.api.deleteCliente(c.id).subscribe(() => {
      this.clientes = this.clientes.filter((x) => x.id !== c.id);
    });
  }*/
  delete(c: any) {
    if (!confirm('¿Eliminar cliente?')) {
      return;
    }

    console.log('ID CLIENTE:', c.id);

    // حذف مباشر من table
    this.clientes = this.clientes.filter((x) => x.id !== c.id);

    // محاولة الحذف من API
    this.api.deleteCliente(c.id).subscribe({
      next: (res) => {
        console.log('DELETE OK', res);
      },

      error: (err) => {
        console.log('DELETE ERROR', err);
      },
    });
  }
  close() {
    this.showForm = false;
  }
}
