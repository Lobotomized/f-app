import { io } from "socket.io-client";

const URL = "https://f-app-be-nsp7m.ondigitalocean.app";

//const URL = "https://localhost:8080";

const socket = io(URL);

export default socket;