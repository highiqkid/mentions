import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createCarrotPlugin, { defaultSuggestionsFilterCarrot } from 'draft-js-carrot-plugin';
//import editorStyles from '../css/base.css';
import carrots from './carrots';
import 'draft-js-carrot-plugin/lib/plugin.css';

const carrotPlugin = createCarrotPlugin();
const { CarrotSuggestions } = carrotPlugin;
const pluginsCarrot = [carrotPlugin];

export default class SimpleCarrotEditor extends Component {

constructor() {
    super();
    this.state = {
        editorState: EditorState.createEmpty(),
		    suggestionsCarrot: carrots.carrots,
    };

    this.onChange = this.onChange.bind(this);
	  this.onCarrotSearchChange = this.onCarrotSearchChange.bind(this);
    this.focus = this.focus.bind(this);
  }



  onChange(editorState) {
    this.setState({
      editorState,
    });
  };

  onCarrotSearchChange({ value }){
    this.setState({
      suggestionsCarrot: defaultSuggestionsFilterCarrot(value, carrots),
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
          plugins={pluginsCarrot}
          ref="editor"
        />
        <CarrotSuggestions
          onSearchChange={ this.onCarrotSearchChange }
          suggestions={ this.state.suggestionsCarrot }
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
