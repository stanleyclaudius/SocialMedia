let users = [];

const socketServer = (socket) => {
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id});
    console.log(users);
  });
};

module.exports = socketServer;