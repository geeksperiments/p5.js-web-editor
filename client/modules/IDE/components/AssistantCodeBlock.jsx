import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { syntaxHighlighting } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { highlightStyle } from './Editor/utils/highlightStyle';

export default function AssistantCodeBlock({ code }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [
        javascript(),
        syntaxHighlighting(highlightStyle),
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
        EditorView.lineWrapping,
        EditorView.contentAttributes.of({
          'aria-label': 'Suggested JavaScript code'
        }),
        EditorView.theme({
          '&': { height: 'auto', backgroundColor: 'transparent' },
          '.cm-scroller': { overflow: 'visible' },
          '.cm-content': { padding: '0' },
          '.cm-line': { padding: '0' }
        })
      ]
    });
    const view = new EditorView({ state, parent: containerRef.current });
    return () => view.destroy();
  }, [code]);

  return <div className="p5-assistant__code" ref={containerRef} />;
}

AssistantCodeBlock.propTypes = {
  code: PropTypes.string.isRequired
};
