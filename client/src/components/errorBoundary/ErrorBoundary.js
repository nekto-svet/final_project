import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(){
        super();
        this.state = {
            hasError: false,
        };
    } 

    componentDidCatch = (error, errorInfo) => {
        console.log(error);
        this.setState({hasError: true});
    }

    handleRefresh = () => {
        window.location.reload();
    }

    handleGoBack = () => {
        window.history.back();
    }

    render(){
        if (this.state.hasError){
            return (
                <div>
                    <p>Ooops, something went wrong.</p>
                    <button onClick={this.handleRefresh}>Refresh Page</button>
                    <button onClick={this.handleGoBack}>Go back</button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;