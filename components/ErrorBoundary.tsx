import { Component } from "react";

interface Props {}

class ErrorBoundary extends Component<Props, { errorMessage: string }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }

  componentDidCatch(err: any) {
    console.error(err);
    this.setState({ errorMessage: err.message });
  }

  render() {
    return (
      <>
        {this.state.errorMessage ? (
          <div>Something went wrong: {this.state.errorMessage}</div>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
