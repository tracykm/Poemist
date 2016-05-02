
var svgFilters = {
  addSVG: function(){
    var poems = document.getElementsByClassName("sinlgePoem")
    for (var i = 1; i <= poems.length; i++) {
      var poem = poems[i]
      var svg = d3.select("li:nth-child("+i+") .sinlgePoem").insert("svg", ":first-child")
        .attr("width", 900)
        .attr("height", 1000)
      boxes = svgFilters.getWordBoxes(i)

      if(svg.empty()){
        svg = d3.select(".sinlgePoem").insert("svg", ":first-child")
          .attr("width", 900)
          .attr("height", 1000)
        boxes = svgFilters.getWordBoxes(1)
      }
      svgFilters.addCircles(svg, boxes)
    }
  },
  addCircles: function (svg, boxes){
    boxes.forEach(function(box){
      for (var i = 0; i < 6; i++) {
        svg.append("circle")
        .attr("cx", box.center.x)
        .attr("cy", box.center.y)
        .attr("r", 35 * i * box.width / 100)
        .style("fill", "purple")
        .style("opacity", ".2");
      }
    })
  },

  getWordBoxes: function (poemNum){
    var pageTop = document.querySelector('.poemText').offsetTop;
    // var STAR_POINTS = "20 0, 25 20, 40 20, 30 30, 35 45, 20 35, 5,45, 10 30, 0,20, 15 20"

    var boxes = []

    // if single poem view
    if(d3.select("li").empty()){
      $(".selected").each(function(i, elem){
        var top = elem.offsetTop + pageTop;
        var box = {
          x: elem.offsetLeft,
          y: top,
          width: elem.offsetWidth,
          height: elem.offsetHeight,
          center: {
            x: elem.offsetLeft + elem.offsetWidth / 2,
            y: top + elem.offsetHeight / 2
          }
        }
        boxes.push(box)
      })

    // if list view
    }else{
      $("li:nth-child("+poemNum+") .selected").each(function(i, elem){
        var top = elem.offsetTop + pageTop;
        var box = {
          x: elem.offsetLeft,
          y: top,
          width: elem.offsetWidth,
          height: elem.offsetHeight,
          center: {
            x: elem.offsetLeft + elem.offsetWidth / 2,
            y: top + elem.offsetHeight / 2
          }
        }
        boxes.push(box)
      })
    }
    return boxes
  }

}

module.exports = svgFilters;
