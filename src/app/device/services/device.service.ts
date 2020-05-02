import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Device } from "../models/device.model";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  constructor(public http: HttpClient) {}

  getDevices() {
    return this.http.get(`${environment.API_URL}/devices`);
  }

  getDevice(id: string) {
    return this.http.get(`${environment.API_URL}/devices/${id}`);
  }

  getDevicesByGatewayId(id: string) {
    return this.http.get(`${environment.API_URL}/gateways/${id}/devices`);
  }

  addDevice(data: Device, id: string) {
    return this.http.post(`${environment.API_URL}/devices/${id}`, data);
  }

  updateDevice(data: Device) {
    return this.http.put(`${environment.API_URL}/devices/${data._id}`, data);
  }

  removeDevice(id: string) {
    return this.http.delete(`${environment.API_URL}/devices/${id}`);
  }
}
