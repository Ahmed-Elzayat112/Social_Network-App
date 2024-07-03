let io;

module.exports = {
    init: (server) => {
        io = require("socket.io")(server);
        // io.on("connection", (socket) => {
        //     socket.on("join-room", (roomId) => {
        //         socket.join(roomId);
        //     });
        //     socket.on("leave-room", (roomId) => {
        //         socket.leave(roomId);
        //     });
        //     socket.on("send-message", (message) => {
        //         io.to(message.roomId).emit("receive-message", message);
        //     });
        // });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized");
        }
        return io;
    },
};
