import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // 🔐 HEADERS (POST / GET)
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json',
      }),
    };
  }

  // 🔥 PATCH HEADERS (FIX FINAL)
  private getPatchHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/merge-patch+json',
      }),
    };
  }

  // =========================
  // 👤 CLIENTES
  // =========================

  /* getClientes() {
    return this.http.get<any>(`${this.baseUrl}/clientes`, this.getHeaders());
  }
    */
  getClientes() {
    return this.http.get<any>(`${this.baseUrl}/clientes?pagination=false`, this.getHeaders());
  }

  addCliente(data: any) {
    return this.http.post(`${this.baseUrl}/clientes`, data, this.getHeaders());
  }

  // 🔥 FIX UPDATE
  updateCliente(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/clientes/${id}`, data, this.getPatchHeaders());
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.baseUrl}/clientes/${id}`, this.getHeaders());
  }

  // =========================
  // ✂️ SERVICIOS
  // =========================

  getServicios() {
    return this.http.get<any>(`${this.baseUrl}/servicios`, this.getHeaders());
  }

  addServicio(data: any) {
    return this.http.post(`${this.baseUrl}/servicios`, data, this.getHeaders());
  }

  updateServicio(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/servicios/${id}`, data, this.getPatchHeaders());
  }

  deleteServicio(id: number) {
    return this.http.delete(`${this.baseUrl}/servicios/${id}`, this.getHeaders());
  }

  // =========================
  // 📅 CITAS
  // =========================
  /* getCitaServicios() {
    return this.http.get('http://localhost:8000/api/cita_servicios');
  }
  */
  getCitaServicios() {
    return this.http.get<any>(`${this.baseUrl}/cita_servicios`, this.getHeaders());
  }
  getCitas() {
    return this.http.get<any>(`${this.baseUrl}/citas`, this.getHeaders());
  }

  addCita(data: any) {
    return this.http.post(`${this.baseUrl}/citas`, data, this.getHeaders());
  }

  // 🔥 FIX CONFIRM
  updateCita(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/citas/${id}`, data, this.getPatchHeaders());
  }

  deleteCita(id: number) {
    return this.http.delete(`${this.baseUrl}/citas/${id}`, this.getHeaders());
  }

  // =========================
  // 🧾 FACTURAS
  // =========================

  getFacturas() {
    return this.http.get<any>(`${this.baseUrl}/facturas`, this.getHeaders());
  }

  addFactura(data: any) {
    return this.http.post(`${this.baseUrl}/facturas`, data, this.getHeaders());
  }

  deleteFactura(id: number) {
    return this.http.delete(`${this.baseUrl}/facturas/${id}`, this.getHeaders());
  }
  //=================================
  //Facturas_Detalles
  //=================================
  addDetalleFactura(data: any) {
    return this.http.post(`${this.baseUrl}/detalle_facturas`, data, this.getHeaders());
  }
  getDetalleFacturas() {
    return this.http.get<any>(`${this.baseUrl}/detalle_facturas`, this.getHeaders());
  }
  deleteDetalleFactura(id: number) {
    return this.http.delete(`${this.baseUrl}/detalle_facturas/${id}`, this.getHeaders());
  }

  // =========================
  // 🧑‍💼 ADMINS
  // =========================

  getAdmins() {
    return this.http.get<any>(`${this.baseUrl}/admins`, this.getHeaders());
  }

  addAdmin(data: any) {
    return this.http.post(`${this.baseUrl}/admins`, data, this.getHeaders());
  }

  // =========================
  // LOGIN (ما مسّيناهش)
  // =========================

  loginSimple(username: string, password: string) {
    return this.http.get<any>(`${this.baseUrl}/admins`);
  }
}
