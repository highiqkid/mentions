import React from 'react';
import Comment from './Comment';

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
	  // took out author={comment.author} inside of Comment
        <Comment key={comment.id}>
          {comment.text}
        </Comment>
		
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

export default CommentList;