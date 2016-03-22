module.exports = {
  logBoo: function () {
    console.log("---- Boo! ----");
  },
  // fadeIn: function(i,elements,duration,callback){
  //     if(i >= elements.length){
  //         typeof callback == 'function' && callback();
  //     }else{
  //         elements.eq(i).fadeIn(duration,function(){
  //            fadeIn(i+1,elements,duration,callback);
  //         });
  //     }
  // },
  timeSince: function (created_at) {
      var date = new Date(created_at);

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 0) {
        return timeAgo(interval, "years");
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 0) {
        return timeAgo(interval, "months");
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 0) {
        return timeAgo(interval, "days");
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 0) {
        return timeAgo(interval, "hours");
      }
      interval = Math.floor(seconds / 60);
      if (interval > 0) {
        return timeAgo(interval, "minutes");
      }
      return Math.floor(seconds) + " seconds";
  },

  likingPoem: function($poem){
    $poem.addClass("liking");
    setTimeout(function(){
      $poem.removeClass("liking");
    },500)
  }
};


function timeAgo(interval, timeWord){
  var result = interval + " " + timeWord;
  if(interval === 1){
    result = result.slice(0, -1);
  }
  return result;
}
