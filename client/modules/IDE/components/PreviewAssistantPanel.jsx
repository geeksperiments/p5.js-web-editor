import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PreviewFrame from './PreviewFrame';
import AssistantTab from './AssistantTab';

export default function PreviewAssistantPanel({
  fullView = false,
  isOverlayVisible = false,
  files,
  consoleEvents,
  editorControllerRef
}) {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <section className="preview-frame-holder">
      <header
        className="preview-frame__header"
        role="tablist"
        aria-label="Preview panel"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'preview'}
          aria-controls="p5-preview-panel"
          className="preview-frame__tab"
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'assistant'}
          aria-controls="p5-assistant-panel"
          className="preview-frame__tab"
          onClick={() => setActiveTab('assistant')}
        >
          Assistant
        </button>
      </header>
      <div className="preview-frame__content">
        <div
          id="p5-preview-panel"
          className="preview-frame__surface"
          role="tabpanel"
          hidden={activeTab !== 'preview'}
        >
          <PreviewFrame
            fullView={fullView}
            isOverlayVisible={isOverlayVisible}
          />
        </div>
        <div
          id="p5-assistant-panel"
          className="preview-frame__surface"
          role="tabpanel"
          hidden={activeTab !== 'assistant'}
        >
          <AssistantTab
            files={files}
            consoleEvents={consoleEvents}
            editorControllerRef={editorControllerRef}
          />
        </div>
      </div>
    </section>
  );
}

PreviewAssistantPanel.propTypes = {
  fullView: PropTypes.bool,
  isOverlayVisible: PropTypes.bool,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      content: PropTypes.string,
      filePath: PropTypes.string,
      fileType: PropTypes.string
    })
  ).isRequired,
  consoleEvents: PropTypes.arrayOf(
    PropTypes.shape({ method: PropTypes.string })
  ).isRequired,
  editorControllerRef: (props, propName, componentName) => {
    const value = props[propName];
    if (value === null || value === undefined) return null;
    if (!value || typeof value !== 'object' || !('current' in value)) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`.`
      );
    }
    return null;
  }
};

PreviewAssistantPanel.defaultProps = {
  fullView: false,
  isOverlayVisible: false,
  editorControllerRef: null
};
