import React from 'react';
import './css/settings.css';

class Settings extends React.Component {
  render() {
    return (
      <h1
        className="settings-title"
        data-testid="settings-title"
      >
        Settings title
      </h1>
    );
  }
}

export default Settings;
