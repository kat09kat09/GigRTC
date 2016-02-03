

export function onBroadcast(currentRoom){
skylink.init({
  apiKey: 'e8a678bc-e0e4-4605-aa76-cc857b7dbbd0',
  defaultRoom: currentRoom
}, function(){
  skylink.joinRoom({
    audio: true,
    video: true
  });
});
};

