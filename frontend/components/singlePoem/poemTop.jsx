var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  delete: function(e){
    if (confirm('Delete poem? \nIt was really good, we all thought so :(')) {
      ApiUtil.deletePoem(this.props.poem.id);
      if(this.props.inDetailView || this.props.inCreateView){
        this.history.pushState(null, "/");
      }
    }
  },

  edit: function(e){
    this.history.pushState(null, "/edit/"+this.props.poem.id+"/create");
  },

  goToPoem: function(e){
    if(this.props.poem.id){
      window.scrollTo(0,0);
      this.history.pushState(null, "/poem/"+this.props.poem.id);
    }
  },

  render: function () {
    var deleteBtn = "";
    var editBtn = "";
    var zoomBtn = "";
    if(window.current_user && parseInt(window.current_user.id) === this.props.poem.author_id){
      deleteBtn = <span className="deleteBtn" onClick={this.delete}>✕</span>;
      editBtn = <span className="editBtn" onClick={this.edit}>edit</span>;
    }
    if(!this.props.inCreateView){
      zoomBtn = (<span className="zoomBtn" onClick={this.goToPoem}> <i className="icon-zoom-in"></i> </span>);
    }


    return(
      <div className="poemTopLeft">
        {deleteBtn}{editBtn}{zoomBtn}
      </div>
    );

  }
});
