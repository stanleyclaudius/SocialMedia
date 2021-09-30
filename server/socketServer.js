let users = [];

const EditData = (data, id, call) => {
  const newData = data.map(item => item.id === id ? {...item, call} : item);
  return newData;
}

const socketServer = (socket) => {
  // Connect
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id, followers: user.followers});
  });

  // Disconnect
  socket.on('disconnect', () => {
    const data = users.find(item => item.socketId === socket.id);
    if (data) {
      const client = users.filter(item => data.followers.find(user => user._id === item.id));
      if (client.length > 0) {
        client.forEach(item => {
          socket.to(`${item.socketId}`).emit('checkUserOffline', data.id);
        })
      }

      if (data.call) {
        const callUser = users.find(user => user.id === data.call);
        if (callUser) {
          users = EditData(users, callUser.id, null);
          socket.to(`${callUser.socketId}`).emit('callerDisconnect')
        }
      }
    }
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

  // Create Message
  socket.on('createMessage', data => {
    const user = users.find(user => user.id === data.recipient.user._id);
    user && socket.to(`${user.socketId}`).emit('createMessageToClient', data);
  });

  // Check User Online
  socket.on('checkUserOnline', data => {
    const followings = users.filter(item => data.followings.find(user => user._id === item.id));
    socket.emit('checkUserOnlineToMe', followings);

    const followers = users.filter(item => data.followers.find(user => user._id === item.id));
    if (followers.length > 0) {
      followers.forEach(client => {
        socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id);
      })
    }
  })

  // Call User
  socket.on('callUser', data => {
    users = EditData(users, data.sender, data.recipient);

    const client = users.find(item => item.id === data.recipient);
    if (client) {
      if (client.call) {
        socket.emit('userBusy', data);
        users = EditData(users, data.sender, null);
      } else {
        users = EditData(users, data.recipient, data.sender);
        socket.to(`${client.socketId}`).emit('callUserToClient', data);
      }
    }
  });

  // End Call
  socket.on('endCall', data => {
    const client = users.find(item => item.id === data.sender);

    if (client) {
      socket.to(`${client.socketId}`).emit('endCallToClient', data);
      users = EditData(users, client.id, null);

      if (client.call) {
        const clientCall = users.find(item => item.id === client.call);
        clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data);

        users = EditData(users, client.call, null);
      }
    }
  });
};

module.exports = socketServer;