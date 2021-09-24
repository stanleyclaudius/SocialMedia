let users = [];

const socketServer = (socket) => {
  // Connect
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id});
  });

  // Disconnect
  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
  });

  // Like Post
  socket.on('likePost', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('likePostToClient', data);
    })
  });

  // Unlike Post
  socket.on('unlikePost', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('unlikePostToClient', data);
    })
  });
};;

module.exports = socketServer;