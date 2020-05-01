import React from 'react';
import Canvas from './Canvas';
import { DataPixels } from '../../modules'

type PixelPreviewProps = {
    matrix: string[][] | null,
    horisontal: number,
    // vertical: number,
    padding?: number
    width: number,
    height: number,
}

type PixelPreviewState = {
    pixelSize: number,
    canvasWidth: number,
    canvasHeight: number,
    padding: number,
}

export class PixelPreview extends React.Component<PixelPreviewProps, PixelPreviewState> {

    state = {
        pixelSize: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        padding: this.props.padding || 0,
    }

    componentDidMount = () => {
        this.recalcCanvasDimentions();
    }

    componentDidUpdate(prevProps: PixelPreviewProps, prevState: PixelPreviewState) {
        if (
            this.props.width !== prevProps.width ||
            this.props.height !== prevProps.height
        ) {
            this.recalcCanvasDimentions();
        }
    }

    handleResize = (event: Event) => {
        this.recalcCanvasDimentions();
    }

    recalcCanvasDimentions() {
        const { width, height, horisontal: matrixSideLength } = this.props;

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
            <Canvas
                width={canvasWidth}
                height={canvasHeight}
                canvas={this.createPixelDattaCanvas()}
                withBackground={true}
            />
        );
    }

    private createPixelDattaCanvas(): HTMLCanvasElement | null {
        const { matrix } = this.props;
        const { pixelSize } = this.state;

        if (!matrix || !matrix.length) {
            return null;
        }

        return new DataPixels(matrix, pixelSize).canvas;
    }
}
