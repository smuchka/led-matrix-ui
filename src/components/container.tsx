
import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}
// type ContainerState = {}

export class Container extends React.Component<ContainerProps> {

    private containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: ContainerProps) {
        super(props);
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount = () => {
        const container = this.containerRef.current;

        if (container) {
            const { width, height } = container.getBoundingClientRect();
        }
    }

    render() {
        const { children } = this.props;

        return (
            <div
                className="container"
                ref={this.containerRef}
            >
                {children}
            </div>
        );
    }
}