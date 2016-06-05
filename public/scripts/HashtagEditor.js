import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagsPlugin, { defaultSuggestionsFilterHashtags } from 'draft-js-hashtags-plugin';
//import editorStyles from '../css/base.css';
import hashtags from './Hashtags';
import 'draft-js-hashtags-plugin/lib/plugin.css';

const hashtagsPlugin = createHashtagsPlugin();
const { HashtagsSuggestions } = hashtagsPlugin;
const pluginsHashtags = [hashtagsPlugin];

export default class SimpleHashtagEditor extends Component {

constructor() {
    super();
    this.state = {
        editorState: EditorState.createEmpty(),
		    suggestionsHashtags: hashtags.hashtags,
    };

    this.onChange = this.onChange.bind(this);
	this.onHashtagsSearchChange = this.onHashtagsSearchChange.bind(this);
    this.focus = this.focus.bind(this);
  }



  onChange(editorState) {
    this.setState({
      editorState,
    });
  };

  onHashtagsSearchChange({ value }){
    this.setState({
      suggestionsHashtags: defaultSuggestionsFilterHashtags(value, hashtags),
    });
  };

  focus(){
    this.refs.editor.focus();
  };

  render() {
    return (
      <div className="editor" onClick={ this.focus }>
        <Editor
          editorState={ this.state.editorState }
          onChange={this.onChange}
          plugins={pluginsHashtags}
          ref="editor"
        />
        <HashtagsSuggestions
          onSearchChange={ this.onHashtagsSearchChange }
          suggestions={ this.state.suggestionsHashtags }
        />
      </div>
    );
  }
}



/*import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import 'draft-js-hashtag-plugin/lib/plugin.css';

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];
const text = `Hi this is Victor #ideaflow
`;

export default class SimpleHashtagEditor extends Component {

  constructor() {
    super();
    this.state = {
      editorState: createEditorStateWithText(text),
    };

    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
  }

  onChange(editorState) {
    this.setState({
      editorState,
    });
  };

  focus() {
    this.refs.editor.focus();
  };

  render() {
    return (
      <div className="editor" onClick={ this.focus }>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref="editor"
        />
      </div>
    );
  }
}
*/
