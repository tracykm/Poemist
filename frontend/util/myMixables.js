module.exports = {
  logBoo: function () {
    console.log("---- Boo! ----");
  },
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
  }
};


function timeAgo(interval, timeWord){
  var result = interval + " " + timeWord;
    if(interval === 1){
      result = result.slice(0, -1);
    }
    return result;
  }
