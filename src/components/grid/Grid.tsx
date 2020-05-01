import React, { Fragment } from 'react';
import GridCell, { Cell } from './GridCell';
import classes from './Grid.module.css';

export type GridProps = {
    cells: Cell[][],
    columns: number,
    rows: number,

    gridGap: number,
    cell: {
        width: number,
        height: number,
    }
};

export default class Grid extends React.Component<GridProps> {

    pixelSize = () => {
        return this.props.cell.width;
    };

    handlerCellClick = (e: any) => {
        console.log(e);
    }

    render() {

        const countColumns = this.props.cells.length;
        const countRows = this.props.cells[0].length;
        const gridGap = this.props.gridGap;
        const gridWight = (countColumns * this.pixelSize()) + gridGap * countColumns;
        const gridHeight = (countRows * this.pixelSize()) + gridGap * countColumns;

        const styles = {
            gridTemplateColumns: `repeat(${countColumns}, 1fr)`,
            gridGap: `${gridGap}px`,
            width: `${gridWight}px`,
            height: `${gridHeight}px`,
        };

        const rows = this.props.cells;

        return (
            <div
                className={classes.grid}
                style={styles}
            >
                {
                    rows.map(row => {
                        return row.map(cell => {
                            return (
                                <Fragment key={cell.index}>
                                    <GridCell
                                        data={cell}
                                        width={this.pixelSize()}
                                        height={this.pixelSize()}
                                        onCellClick={this.handlerCellClick}
                                    />
                                </Fragment>
                            )
                        })
                    })
                }
            </div>
        );
    }
}