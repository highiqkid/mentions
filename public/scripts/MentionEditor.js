import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
//import createCarrotPlugin, { defaultSuggestionsFilterCarrot } from 'draft-js-carrot-plugin';
//import carrots from './carrots';
//import 'draft-js-carrot-plugin/lib/plugin.css';
//import editorStyles from '../css/base.css';
import mentions from './mentions';
import 'draft-js-mention-plugin/lib/plugin.css';


//const carrotPlugin = createCarrotPlugin();
//const { CarrotSuggestions } = carrotPlugin;

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class SimpleMentionEditor extends Component {

constructor() {
    super();
    this.state = {
        editorState: EditorState.createEmpty(),
		suggestions: mentions.mentions,
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
      suggestions: defaultSuggestionsFilter(value, mentions),
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
