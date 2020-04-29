import React from 'react'

export interface Cell {
    index: number,
    color: string | null,
    row: number,
    column: number,
}

type GridCellProps = {
    data: Cell;
    width: number,
    height: number,
    onCellClick: Function,
};

export default function GridCell(props: GridCellProps) {

    const {
        data: { row, column, color },
        width,
        height,
    } = props;

    const styles: Record<string, string> = {
        width: `${width}px`,
        height: `${height}px`,
    }

    if (!!color) {
        styles.backgroundColor = `rgb(${color})`;
    }

    const classList = () => {
        const classList = ['cell'];

        if (!!color) {
            classList.push('filled')
        }

        return classList.join(' ')
    }

    const clickData = { row, column };

    return (
        <div
            style={styles}
            className={classList()}
            onClick={() => props.onCellClick(clickData)}
        />
    );
}