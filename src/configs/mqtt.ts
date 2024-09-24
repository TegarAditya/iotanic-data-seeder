import { connect, IClientOptions } from "mqtt";

const options: IClientOptions = {
  clientId: "raspi",
  username: "user1",
  password: "user123",
  queueQoSZero: false,
};

export const mqttClient = connect("mqtt://103.155.246.91:18831", options);
