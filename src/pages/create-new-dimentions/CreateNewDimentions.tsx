import React, { Component } from 'react';
import './CreateNewDimentions.css';

interface CreateNewDimentionsProps {

}
interface CreateNewDimentionsState {

}

export default class CreateNewDimentions extends Component<CreateNewDimentionsProps, CreateNewDimentionsState> {
    state = {}

    render() {
        return (
            <div className="create-new-settings">
                <div className="dimetions-size">
                    <div className="row input-container">
                        <label htmlFor="state">vertical</label>
                        <input type="text" name="horizontal" placeholder="0" />
                    </div>

                    <div className="row">X</div>

                    <div className="row input-container">
                        <label htmlFor="state">horisontal</label>
                        <input type="text" name="vertical" placeholder="0" />
                    </div>
                </div>
            </div>
        )
    }
}
