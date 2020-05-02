import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gateway } from "../models/gateway.model";

@Injectable({
  providedIn: "root",
})
export class GatewayService {
  constructor(public http: HttpClient) {}

  getGateways() {
    return this.http.get(`${environment.API_URL}/gateways`);
  }

  getGateway(id: string) {
    return this.http.get(`${environment.API_URL}/gateways/${id}`);
  }

  addGateway(data: Gateway) {
    return this.http.post(`${environment.API_URL}/gateways`, data);
  }

  updateGateway(data: Gateway) {
    return this.http.put(`${environment.API_URL}/gateways/${data._id}`, data);
  }

  removeGateway(id: string) {
    return this.http.delete(`${environment.API_URL}/gateways/${id}`);
  }
}
