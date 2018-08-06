import React, { Component } from 'react'

class ErrorBoundary extends Component {
    state = {
        hasError: false
    };

    componentDidCatch(error, info) {
        console.error( error );
        console.error( info );

        this.setState({
            hasError: true
        });
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <div style={{textAlign: 'center'}}>Oops error 🦄</div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary