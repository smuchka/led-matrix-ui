import React from 'react'
import Grid from './grid';
import { Cell } from "./grid-cell"
import { Pixel } from "../../App"

type PixelPaletProps = {
    matrix: Pixel[][],
    columns: number,
    rows: number,
    padding: number,
}

type PixelPaletState = {
    cells: Cell[][],
    cell: {
        width: number,
        height: number,
    },
    gridGap: number,
    padding: number,
}

export class PixelPalet extends React.Component<PixelPaletProps, PixelPaletState> {

    state = {
        cells: [[]],
        cell: {
            width: 0,
            height: 0,
        },
        gridGap: 0,
        padding: this.props.padding || 0,
    }

    private containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: PixelPaletProps) {
        super(props);
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.recalcCanvasDimentions();
    }

    handleResize = (event: Event) => {
        this.recalcCanvasDimentions();
    }

    recalcCanvasDimentions() {
        const container = this.containerRef.current;
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();

        const gridGap = 2;
        const matrixSideLength = this.props.columns;
        let maxSize = Math.floor(
            (width > height ? height : width) - this.state.padding
        );
        if (maxSize < 0) {
            maxSize = 0
        }

        let pixelSize: number = 0;
        const gridColumnsWidth = maxSize - gridGap - (gridGap * matrixSideLength);
        if (matrixSideLength) {
            pixelSize = Math.floor(gridColumnsWidth / matrixSideLength);
        } else {
            pixelSize = Math.floor(gridColumnsWidth);
        }

        this.setState({
            gridGap,
            cell: {
                width: pixelSize,
                height: pixelSize,
            }
        })
    }

    render() {
        const { cell: { width, height }, gridGap, } = this.state;
        const { matrix, columns, rows, } = this.props;

        const cells = this.createPalet(matrix)
        const cellDimentions = { width, height };

        return (
            <div className="matrix-panel">
                <div
                    className="container"
                    ref={this.containerRef}
                >
                    <Grid
                        cells={cells}
                        columns={columns}
                        rows={rows}
                        cell={cellDimentions}
                        gridGap={gridGap}
                    />
                </div>
            </div>
        )
    }

    generateMatrix(columns: number, rows: number): Cell[][] {
        return Array(rows).fill(null).map((el, vertical) => {
            return Array(columns).fill(null).map((el, horisontal) => {
                return {
                    index: (vertical + 1) * (horisontal + 1),
                    color: null,
                    row: vertical,
                    column: horisontal,
                }
            })
        })
    }

    createPalet = (initial: Pixel[][]): Cell[][] => {

        if (!initial) {
            initial = [];
        }
        const initRows = initial.length;
        const initColumns = initRows && initial[0]?.length ? initial[0].length : 0;

        const matrix = this.generateMatrix(
            this.props.columns,
            this.props.rows,
        )

        const columnCount = this.props.columns > initColumns ? initColumns : this.props.columns;
        const rowCount = this.props.rows > initRows ? initRows : this.props.rows;

        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                matrix[i][j].color = initial[i][j];
            }
        }

        return matrix;
    }
}

