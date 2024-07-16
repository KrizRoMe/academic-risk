import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const WhatsappClient = new Client({
  authStrategy: new LocalAuth(),
});

WhatsappClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

WhatsappClient.on("ready", () => {
  console.log("Client is ready!");
});

WhatsappClient.initialize();

export default WhatsappClient;
