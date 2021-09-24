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

  // Create Comment
  socket.on('createComment', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('createCommentToClient', data);
    })
  });

  // Delete Comment
  socket.on('deleteComment', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('deleteCommentToClient', data);
    })
  });

  // Like Comment
  socket.on('likeComment', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('likeCommentToClient', data);
    })
  });

  // Unlike Comment
  socket.on('unlikeComment', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('unlikeCommentToClient', data);
    })
  });

  // Edit Comment
  socket.on('editComment', data => {
    users.forEach(client => {
      socket.to(`${client.socketId}`).emit('editCommentToClient', data);
    })
  });
};

module.exports = socketServer;