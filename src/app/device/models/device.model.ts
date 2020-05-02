import { Gateway } from "src/app/gateway/models/gateway.model";

export class Device {
  _id: string;
  uid: number;
  vendor: string;
  date_created: string;
  status: string;
  gateway: Gateway;
}
