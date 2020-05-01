
import React from 'react'
import './container.css'

type ContainerProps = {
    children: (api: API) => React.ReactNode
}

type API = ReturnType<Container['getApi']>;

type ContainerState = {
    width: number,
    height: number,
};

class Container extends React.Component<ContainerProps, ContainerState> {

    private containerRef: React.RefObject<HTMLDivElement>;

    readonly state = {
        width: 0,
        height: 0,
    };

    constructor(props: ContainerProps) {
        super(props);
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    private getApi() {
        return {
            width: this.state.width,
            height: this.state.width
        };
    }

    private handleResize = (event: Event) => {
        this.recalcCanvasDimentions();
    }

    private recalcCanvasDimentions() {
        const container = this.containerRef.current;

        if (container) {
            const { width, height } = container.getBoundingClientRect();

            this.setState({ width, height });
        }
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.recalcCanvasDimentions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { children } = this.props;
        return (
            <div
                className="container"
                ref={this.containerRef}
            >
                {children(this.getApi())}
            </div>
        );
    }
}

export default Container;