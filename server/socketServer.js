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

  // Follow User
  socket.on('follow', data => {
    const user = users.find(item => item.id === data._id);
    user && socket.to(`${user.socketId}`).emit('followToClient', data);
  });

  // Unfollow User
  socket.on('unfollow', data => {
    const user = users.find(item => item.id === data._id);
    user && socket.to(`${user.socketId}`).emit('unfollowToClient', data);
  });

  // Create Notification
  socket.on('createNotification', data => {
    const recipients = [];
    data.recipients.forEach(item => recipients.push(item.user));

    const user = users.filter(item => recipients.includes(item.id));
    user.forEach(client => {
      socket.to(`${client.socketId}`).emit('createNotificationToClient', data);
    })
  });

  // Delete Notification
  socket.on('deleteNotification', data => {
    const recipients = [];
    data.recipients.forEach(item => recipients.push(item.user));

    const user = users.filter(item => recipients.includes(item.id));
    user.forEach(client => {
      socket.to(`${client.socketId}`).emit('deleteNotificationToClient', data);
    })
  });
};

module.exports = socketServer;