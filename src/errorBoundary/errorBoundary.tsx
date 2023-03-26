import React from 'react';
import styles from './errorBoundary.module.css';

type ErrorBoundaryProps = {
  children: any;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
