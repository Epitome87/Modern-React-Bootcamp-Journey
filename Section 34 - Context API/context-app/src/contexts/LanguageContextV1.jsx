import React, { createContext } from 'react';

export const LanguageContext = createContext();

export class LanguageProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { language: 'french' };
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(event) {
    this.setState({ language: event.target.value });
  }

  render() {
    return (
      <LanguageContext.Provider
        value={{ ...this.state, changeLanguage: this.changeLanguage }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export const withLanguageContext = (Component) => (props) =>
  (
    <LanguageContext.Consumer>
      {(value) => <Component languageContext={value} {...props} />}
    </LanguageContext.Consumer>
  );
