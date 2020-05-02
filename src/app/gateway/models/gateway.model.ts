import { Device } from "src/app/device/models/device.model";

export class Gateway {
  _id: string;
  serial_number: string;
  name: string;
  address_ip: string;
  devices: Device[];
}
