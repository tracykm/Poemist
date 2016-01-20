var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  delete: function(e){
    if (confirm('Delete poem? \n\nIt was really good, we all thought so :(')) {
      ApiUtil.deletePoem(this.props.poem.id);
      if(this.props.inDetailView || this.props.inCreateView){
        this.history.pushState(null, "/");
      }
    }
  },

  edit: function(e){
    this.history.pushState(null, "/edit/"+this.props.poem.id+"/create");
  },

  render: function () {
    var deleteBtn = "";
    var editBtn = "";
    if(window.current_user && parseInt(window.current_user.id) === this.props.poem.author_id){
      if(this.props.inCreateView){
        deleteBtn = <span className="deleteBtn" onClick={this.delete}>✕ delete</span>;
      }else{
        deleteBtn = <span className="deleteBtn" onClick={this.delete}>✕</span>;
        editBtn = <span className="editBtn" onClick={this.edit}>edit</span>;
      }
    }


    return(
      <div className="poemTopLeft">
        {deleteBtn}{editBtn}<span className="transperent">.</span>
      </div>
    );

  }
});
