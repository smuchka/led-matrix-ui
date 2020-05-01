import React from 'react';

type CanvasProps = {
    width: number,
    height: number,
    canvas: HTMLCanvasElement | null,
    withBackground?: boolean,
}

class Canvas extends React.Component<CanvasProps> {

    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: CanvasProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    private clearAndDrawCanvasContext() {

        const {
            canvas: imageCanvas,
            withBackground
        } = this.props;

        const destonationCanvas = this.canvasRef.current;

        if (!destonationCanvas || !imageCanvas) {
            return;
        }

        const ctx = destonationCanvas.getContext('2d') as CanvasRenderingContext2D;
        const { clientWidth, clientHeight } = destonationCanvas;

        ctx.clearRect(0, 0, clientWidth, clientHeight)

        if (!!withBackground) {
            ctx.fillStyle = 'rgba(222, 222, 222, 0.04)';
            ctx.fillRect(0, 0, clientWidth, clientHeight);
        }

        ctx.drawImage(imageCanvas, 0, 0);
    }

    componentDidUpdate(prevProps: CanvasProps, prevState: CanvasState) {
        this.clearAndDrawCanvasContext();
    }

    render() {
        const { width, height } = this.props;
        return (
            <canvas
                width={width}
                height={height}
                ref={this.canvasRef}
            />)
    }
}

export default Canvas;