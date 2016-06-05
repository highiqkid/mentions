import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import createCarrotPlugin, { defaultSuggestionsFilterCarrot } from 'draft-js-carrot-plugin';
import carrots from './carrots';
import 'draft-js-carrot-plugin/lib/plugin.css';
import mentions from './mentions';
import 'draft-js-mention-plugin/lib/plugin.css';

import createHashtagsPlugin, { defaultSuggestionsFilterHashtags } from 'draft-js-hashtags-plugin';
import hashtags from './Hashtags';
import 'draft-js-hashtags-plugin/lib/plugin.css';

const hashtagsPlugin = createHashtagsPlugin();
const { HashtagsSuggestions } = hashtagsPlugin;

const carrotPlugin = createCarrotPlugin();
const { CarrotSuggestions } = carrotPlugin;

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;

const plugins = [
  mentionPlugin,
  carrotPlugin,
  hashtagsPlugin,
];

export default class SimpleMentionEditor extends Component {

constructor() {
    super();
    this.state = {
        editorState: EditorState.createEmpty(),
		    suggestions: mentions,
        suggestionsCarrot: carrots,
      suggestionsHashtags: hashtags,
    };

    this.onChange = this.onChange.bind(this);
	  this.onSearchChange = this.onSearchChange.bind(this);
    this.onCarrotSearchChange = this.onCarrotSearchChange.bind(this);
  this.onHashtagsSearchChange = this.onHashtagsSearchChange.bind(this);
    this.focus = this.focus.bind(this);
  }

  onChange(editorState) {
    this.setState({
      editorState,
    });
  };

  onSearchChange({ value }){
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions)
    });
  };

  onCarrotSearchChange({ value }){
    this.setState({
      suggestionsCarrot: defaultSuggestionsFilterCarrot(value, carrots),
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
          plugins={plugins}
          ref="editor"
        />

        <MentionSuggestions
          onSearchChange={ this.onSearchChange }
          suggestions={ this.state.suggestions }
        />

        <CarrotSuggestions
          onSearchChange={ this.onCarrotSearchChange }
          suggestions={ this.state.suggestionsCarrot }
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
