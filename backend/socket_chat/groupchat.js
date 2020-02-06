module.exports=function(io){

io.on('connection',(socket)=>{
  console.log(socket.id,'User Connected');
  ((data2)=>{
    socket.on(data2,(allPosts)=>{
       console.log("from the client side");

      ((data)=>{
        console.log("emit",data);
        io.emit(data,allPosts);

      })('allPostsFromBackend');
      // io.emit('newMessage',{content: message.response.post.content});
      //socket.removeAllListeners();
    });
  })('allPostsFromFrontend');
//----------------------------------------
  ((data3)=>{
     socket.on(data3,(datareceive)=>{
      ((data)=>{
        //console.log("emit",data);
        io.emit(data,datareceive);

      })('messageSignalIconFromBackend');
     });

  })('messageSignalIconFromFrontend');

})
}
