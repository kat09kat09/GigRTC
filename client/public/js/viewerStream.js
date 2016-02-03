var skylink = new Skylink();

skylink.on('incomingStream', function(peerId, stream, isSelf){
  if(isSelf) return;
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});
  
  
skylink.init({
  apiKey: 'e8a678bc-e0e4-4605-aa76-cc857b7dbbd0',
  defaultRoom: 'gigg.tv'
}, function(){
  skylink.joinRoom({
 
  });
});