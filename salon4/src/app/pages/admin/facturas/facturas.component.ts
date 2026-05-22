import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import jsPDF from 'jspdf';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h2>Facturas</h2>

      <table *ngIf="facturas.length > 0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let f of facturas">
            <td>{{ f.codigo_factura }}</td>

            <!-- ✅ FIX CLIENTE -->
            <td>{{ f.cliente_nombre }}</td>

            <td>{{ getTotal(f).toFixed(2) }}€</td>

            <td>
              <button class="view" (click)="open(f)">👁️</button>
              <button class="delete" (click)="delete(f)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="facturas.length === 0">No hay facturas aún</p>

      <!-- MODAL -->
      <div class="modal" *ngIf="selected">
        <div class="factura">
          <h2>Factura</h2>

          <p>
            <b>Nº:</b>
            {{ selected.codigo_factura }}
          </p>

          <!-- ✅ FIX CLIENTE -->
          <p>
            <b>Cliente:</b>
            {{ selected.cliente_nombre }}
          </p>

          <div class="actions">
            <button class="download" (click)="downloadPDF()">⬇ Descargar PDF</button>

            <button class="close" (click)="close()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 20px;
      }

      table {
        width: 100%;
        background: white;
        border-radius: 10px;
        margin-top: 20px;
      }

      th {
        background: #111;
        color: white;
        padding: 12px;
      }

      td {
        padding: 12px;
      }

      .modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .factura {
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 400px;
      }

      .download {
        background: green;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 6px;
      }

      .close {
        margin-left: 10px;
      }
    `,
  ],
})
export class FacturasComponent implements OnInit {
  facturas: any[] = [];
  selected: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadFacturas();
  }

  // ✅ LOAD FACTURAS FINAL FIX
  loadFacturas() {
    this.api.getFacturas().subscribe({
      next: (resFacturas: any) => {
        const facturasData = resFacturas.member || [];

        this.api.getClientes().subscribe({
          next: (resClientes: any) => {
            const clientes = resClientes.member || [];

            this.api.getServicios().subscribe({
              next: (resServicios: any) => {
                const servicios = resServicios.member || [];

                this.api.getDetalleFacturas().subscribe({
                  next: (resDetalles: any) => {
                    const detalles = resDetalles.member || [];

                    this.facturas = facturasData.map((f: any) => {
                      // =====================
                      // CLIENTE
                      // =====================

                      const cliente = clientes.find((c: any) => c['@id'] === f.cliente);

                      // =====================
                      // DETAILS
                      // =====================

                      const detallesFactura = detalles
                        .filter((d: any) => d.factura === f['@id'])
                        .map((d: any) => {
                          const servicio = servicios.find((s: any) => s['@id'] === d.servicio);

                          return {
                            ...d,

                            servicio,
                          };
                        });

                      return {
                        ...f,

                        // ✅ CLIENT NAME
                        cliente_nombre: cliente?.nombre || 'Cliente',

                        // ✅ DETAILS
                        detalle_facturas: detallesFactura,
                      };
                    });

                    console.log('FACTURAS FINAL', this.facturas);
                  },
                });
              },
            });
          },
        });
      },
    });
  }

  open(f: any) {
    this.selected = f;
  }

  close() {
    this.selected = null;
  }

  /* delete(f: any) {
    this.api.deleteFactura(f.id).subscribe(() => {
      this.loadFacturas();
    });
  }
    */
  delete(f: any) {
    if (!confirm('Supprimer cette facture ?')) {
      return;
    }

    // 🔥 جيب التفاصيل المرتبطة بالفاتورة
    const detalles = f.detalle_facturas || [];

    // 🔥 إذا ماكان حتى detail
    if (detalles.length === 0) {
      this.deleteFacturaFinal(f);
      return;
    }

    // 🔥 حذف details الأول
    let deleted = 0;

    detalles.forEach((d: any) => {
      this.api.deleteDetalleFactura(d.id).subscribe({
        next: () => {
          deleted++;

          // 🔥 من بعد نحذف facture
          if (deleted === detalles.length) {
            this.deleteFacturaFinal(f);
          }
        },

        error: (err) => {
          console.error(err);
        },
      });
    });
  }
  //Delete DetalleFactura
  deleteFacturaFinal(f: any) {
    this.api.deleteFactura(f.id).subscribe({
      next: () => {
        // ✅ حذف من table مباشرة
        this.facturas = this.facturas.filter((x) => x.id !== f.id);

        // ✅ سد المودال إذا مفتوحة
        if (this.selected?.id === f.id) {
          this.selected = null;
        }
      },

      error: (err) => {
        console.error(err);
        alert('Erreur suppression facture');
      },
    });
  }

  // ✅ SUBTOTAL
  getSubtotal(f: any) {
    if (!f.detalle_facturas) {
      return 0;
    }

    return f.detalle_facturas.reduce(
      (sum: number, d: any) => sum + Number(d.precio) * Number(d.cantidad),
      0,
    );
  }

  // ✅ IVA
  getIVA(f: any) {
    return this.getSubtotal(f) * 0.21;
  }

  // ✅ TOTAL
  getTotal(f: any) {
    return this.getSubtotal(f) + this.getIVA(f);
  }

  // ✅ PDF FINAL PRO
  downloadPDF() {
    const f = this.selected;

    const pdf = new jsPDF();

    // =====================
    // LOGO
    // =====================

    const logo = new Image();

    logo.src = '/images/logo.png';

    logo.onload = () => {
      // =====================
      // LOGO IMAGE
      // =====================

      pdf.addImage(logo, 'PNG', 14, 10, 30, 30);

      // =====================
      // HEADER
      // =====================

      pdf.setFontSize(24);

      pdf.text('SALON PREMIUM', 50, 20);

      pdf.setFontSize(11);

      pdf.text('Diego Lainez, 10', 50, 30);

      pdf.text('Palencia, España', 50, 36);

      pdf.text('Tel: +34 600000000', 50, 42);

      pdf.text('Email: salon@gmail.com', 50, 48);

      // =====================
      // LINE
      // =====================

      pdf.setDrawColor(180);

      pdf.line(14, 58, 196, 58);

      // =====================
      // FACTURA INFO
      // =====================

      pdf.setFontSize(12);

      pdf.text(`Factura: ${f.codigo_factura}`, 130, 20);

      pdf.text(`Fecha: ${f.fecha_factura.substring(0, 10)}`, 130, 28);

      pdf.text(`Hora: ${new Date(f.fecha_factura).toLocaleTimeString()}`, 130, 36);

      // =====================
      // CLIENTE
      // =====================

      let y = 75;

      pdf.setFontSize(15);

      pdf.text(`Cliente: ${f.cliente_nombre}`, 14, y);

      y += 18;

      // =====================
      // TABLE HEADER
      // =====================

      pdf.setFillColor(20, 20, 20);

      pdf.roundedRect(14, y, 182, 10, 2, 2, 'F');

      pdf.setTextColor(255, 255, 255);

      pdf.setFontSize(12);

      pdf.text('Servicio', 20, y + 7);

      pdf.text('Precio', 160, y + 7);

      y += 15;

      // =====================
      // TABLE BODY
      // =====================

      pdf.setTextColor(0, 0, 0);

      pdf.setFontSize(12);

      f.detalle_facturas.forEach((d: any) => {
        pdf.text(d.servicio?.nombre_servicio || 'Servicio', 20, y);

        pdf.text(`${Number(d.precio).toFixed(2)}€`, 160, y);

        // LINE ROW
        pdf.setDrawColor(230);

        pdf.line(20, y + 3, 180, y + 3);

        y += 12;
      });

      // =====================
      // TOTALS BOX
      // =====================

      const subtotal = this.getSubtotal(f);

      const iva = this.getIVA(f);

      const total = this.getTotal(f);

      y += 10;

      pdf.setFillColor(245, 245, 245);

      pdf.roundedRect(120, y, 70, 35, 3, 3, 'F');

      y += 10;

      pdf.setFontSize(11);

      pdf.text(`Subtotal: ${subtotal.toFixed(2)}€`, 130, y);

      y += 8;

      pdf.text(`IVA (21%): ${iva.toFixed(2)}€`, 130, y);

      y += 10;

      pdf.setFontSize(18);

      pdf.text(`TOTAL: ${total.toFixed(2)}€`, 128, y);

      // =====================
      // FOOTER
      // =====================

      pdf.setDrawColor(180);

      pdf.line(14, 270, 196, 270);

      pdf.setFontSize(10);

      pdf.setTextColor(120);

      pdf.text('Gracias por confiar en Salon Premium', 14, 278);

      pdf.text('www.salonpremium.com', 145, 278);

      // =====================
      // SAVE PDF
      // =====================

      pdf.save(`${f.codigo_factura}.pdf`);
    };
  }
}
