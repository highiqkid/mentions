import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-carrot-plugin';
//import editorStyles from '../css/base.css';
import carrots from './carrots';
import 'draft-js-carrot-plugin/lib/plugin.css';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class SimpleCarrotEditor extends Component {
	
constructor() {
    super();
    this.state = {
        editorState: EditorState.createEmpty(),
		suggestions: carrots.carrots,
    };

    this.onChange = this.onChange.bind(this);
	this.onSearchChange = this.onSearchChange.bind(this);
    this.focus = this.focus.bind(this);
  }



  onChange(editorState) {
    this.setState({
      editorState,
    });
  };

  onSearchChange({ value }){
    this.setState({
      suggestions: defaultSuggestionsFilter(value, carrots),
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
          plugins={plugins}
          ref="editor"
        />
        <MentionSuggestions
          onSearchChange={ this.onSearchChange }
          suggestions={ this.state.suggestions }
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