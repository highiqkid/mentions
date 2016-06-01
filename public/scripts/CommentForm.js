var CommentForm = React.createClass({
// in getInitialState took out author: '',
  getInitialState: function() {
    return { text: ''};
  },
  
  /*handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  */
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    //var author = this.state.author.trim();
    var text = this.state.text.trim();
	//took out || !author
    if (!text) {
      return;
    }
	//took out author: author, 
    this.props.onCommentSubmit({text: text});
	//took out author: '',
    this.setState({text: ''});
  },
  render: function() {
    return (
	/* <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
		*/
      <form className="commentForm" onSubmit={this.handleSubmit}>
       
        <input
          type="text"
          placeholder="Enter hashtag"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

