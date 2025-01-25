import { roomStates } from "../utils/stateManager.js";
const handleSocketConnections = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
  
      // Send current state to the connected client
      socket.emit("updateState", roomStates);
  
      // Handle light toggle
      socket.on("toggleSwitch", (data) => {
        const { room, light, state } = data;
        roomStates[room][light] = state;
        io.emit("updateState", roomStates);
      });
  
      socket.on("toggleBoth", (data) => {
        const { room, state } = data;
        roomStates[room].light1 = state;
        roomStates[room].light2 = state;
        io.emit("updateState", roomStates);
      });
  
      socket.on("toggleAll", (data) => {
        io.emit("updateState", {
          bedroom: { light1: data.state, light2: data.state },
          kitchen: { light1: data.state, light2: data.state },
        });
      });
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  };
  export default handleSocketConnections;