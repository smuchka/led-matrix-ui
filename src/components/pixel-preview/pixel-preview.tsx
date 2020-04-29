import React from 'react';
import { DataPixels } from '../../modules';

type PixelPreviewProps = {
    matrix: string[][] | null,
    horisontal: number,
    // vertical: number,
    padding?: number
}

type PixelPreviewState = {
    pixelSize: number,
    canvasWidth: number,
    canvasHeight: number,
    padding: number,
}

export class PixelPreview extends React.Component<PixelPreviewProps, PixelPreviewState> {

    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private containerRef: React.RefObject<HTMLDivElement>;

    state = {
        pixelSize: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        padding: this.props.padding || 0,
    }

    constructor(props: PixelPreviewProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.recalcCanvasDimentions();
    }

    componentDidUpdate(prevProps: PixelPreviewProps, prevState: PixelPreviewState) {
        this.clearAndDrawCanvasContext(true);
    }

    handleResize = (event: Event) => {
        this.recalcCanvasDimentions();
    }

    recalcCanvasDimentions() {
        const container = this.containerRef.current;
        if (!container) return;

        const matrixSideLength = this.props.horisontal;
        const { width, height } = container.getBoundingClientRect();
        let maxSize = Math.floor(
            (width > height ? height : width) - this.state.padding
        );
        if (maxSize < 0) {
            maxSize = 0
        }

        let pixelSize: number = 0;
        if (matrixSideLength) {
            pixelSize = Math.floor(maxSize / matrixSideLength);
        } else {
            pixelSize = Math.floor(maxSize);
        }

        this.setState({
            pixelSize,
            canvasWidth: (pixelSize * matrixSideLength),
            canvasHeight: (pixelSize * matrixSideLength),
        });
    }

    render() {
        const { canvasWidth, canvasHeight } = this.state;

        return (
            <div className="preview-panel">
                <div className="container" ref={this.containerRef}>
                    {
                        <canvas
                            width={canvasWidth}
                            height={canvasHeight}
                            ref={this.canvasRef}
                        />
                    }
                </div>
            </div>
        );
    }

    private clearAndDrawCanvasContext(withBackground: boolean = false) {
        const canvas = this.canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

            ctx.clearRect(0, 0, canvas?.clientWidth, canvas?.clientHeight)

            if (withBackground) {
                ctx.fillStyle = 'rgba(222, 222, 222, 0.04)';
                ctx.fillRect(0, 0, canvas?.clientWidth, canvas?.clientHeight);
            }

            const imageCanvas = this.getCanvasLayer();
            if (imageCanvas) {
                ctx.drawImage(imageCanvas, 0, 0);
            }
        }
    }

    private getCanvasLayer(): HTMLCanvasElement | null {
        const { matrix } = this.props;
        const { pixelSize } = this.state;

        if (!matrix || !matrix.length) {
            return null;
        }

        return new DataPixels(matrix, pixelSize).canvas;
    }
}
