import React, { Component } from 'react';
import Input from '../../components/input/Input';
import './CreateNewDimentions.css';
import { Redirect } from 'react-router-dom';

type Control = {
    value: string | number,
    type: string,
    label: string,
    placeholder: string,
    valid: boolean,
    errorMessage: string,
    touched: boolean,
    validation: ControlValidationMap,
};

type ControlValidationMap = Record<string, boolean | number>;

interface CreateNewDimentionsProps {

}
interface CreateNewDimentionsState {
    navigateUp: boolean,
    navigateNext: boolean,
    //
    isFormValid: boolean,
    formControls: Record<ControlEnum, Control>,
}

enum ControlEnum {
    vertical = 'vertical',
    horisontal = 'horisontal',
}

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
export class CreateNewDimentions extends Component<CreateNewDimentionsProps, CreateNewDimentionsState> {

    private firstFromInput: React.RefObject<HTMLInputElement>;

    state = {
        navigateUp: false,
        navigateNext: false,
        //
        isFormValid: false,
        formControls: {
            [ControlEnum.horisontal]: {
                value: 6,
                type: 'text',
                label: 'horisontal',
                placeholder: '0',
                valid: false,
                errorMessage: 'Set valid value',
                touched: false,
                validation: {
                    required: true,
                    isNumber: true,
                    numberMin: 1,
                    numberMax: 99,
                }
            },
            [ControlEnum.vertical]: {
                value: 10,
                type: 'text',
                label: 'vertical',
                placeholder: '0',
                valid: false,
                errorMessage: 'Set valid value',
                touched: false,
                validation: {
                    required: true,
                    isNumber: true,
                    numberMin: 1,
                    numberMax: 99,
                }
            },
        }
    }

    constructor(props: CreateNewDimentionsProps) {
        super(props);
        this.firstFromInput = React.createRef();
    }

    getFormValues(): Map<ControlEnum, number | string> {
        const values: Map<ControlEnum, number | string> = new Map();
        const formControls: Record<ControlEnum, Control> = this.state.formControls;

        for (let controlName in formControls) {
            values.set(
                controlName as ControlEnum,
                formControls[controlName as ControlEnum].value
            );
        }

        return values;
    }

    validateControl(value: any, validation: ControlValidationMap): boolean {

        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.toString().trim() !== '' && isValid
        }

        if (validation.isNumber) {
            isValid = !isNaN(value) && isValid

            if (validation.numberMin) {
                const ruleValue = validation.numberMin;
                isValid = value >= ruleValue && isValid
            }

            if (validation.numberMax) {
                const ruleValue = validation.numberMax;
                isValid = value <= ruleValue && isValid
            }
        }

        return isValid;
    }

    validateForm() {
        let isFormValid = true;
        const formControls: Record<string, Control> = { ...this.state.formControls };

        Object.keys(formControls).forEach(controlName => {
            const control: Control = { ...formControls[controlName] };
            control.touched = true;
            control.valid = this.validateControl(control.value, control.validation);
            formControls[controlName] = control;

            isFormValid = control.valid && isFormValid
        })

        this.setState({ isFormValid, formControls })
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
        let isFormValid = true;
        const formControls: Record<string, Control> = { ...this.state.formControls };
        const control: Control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        Object.keys(formControls).forEach(name => {
            isFormValid = control.valid && isFormValid
        })

        this.setState({ isFormValid, formControls })
    }

    subminHandler = (event: React.SyntheticEvent<HTMLFormElement> | null) => {
        event && event.preventDefault();
        this.validateForm()

        if (this.state.isFormValid) {
            this.setState({ navigateNext: true })
        }
    }

    keyDownHandler = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case ENTER_KEY:
                this.subminHandler(null);
                break;
            case ESCAPE_KEY:
                this.setState({ navigateUp: true })
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.firstFromInput.current?.focus();
        document.addEventListener("keydown", this.keyDownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDownHandler);
    }

    render() {
        if (this.state.navigateUp) {
            return <Redirect to="/" />
        }

        if (this.state.navigateNext) {
            const valuesMap = this.getFormValues();
            const h = valuesMap.get(ControlEnum.horisontal);
            const v = valuesMap.get(ControlEnum.vertical);

            return <Redirect to={`/matrix/c?h=${h}&v=${v}`} />
        }

        const ref = this.firstFromInput;

        return (
            <div className="create-new-settings">
                <form id="ad" onSubmit={this.subminHandler}>
                    <div className="dimetions-size">
                        <div className="row">
                            {this.renderInput(ControlEnum.horisontal, ref)}
                        </div>

                        <div className="row">X</div>

                        <div className="row">
                            {this.renderInput(ControlEnum.vertical)}
                        </div>
                    </div>
                </form>

                <div className="info">
                    <div>
                        press
                        <span className="key"><span>↵</span></span>
                        to continue
                        </div>
                    <div>
                        or
                        <span className="key"><span>esc</span></span>
                        for cancel
                    </div>
                </div>
            </div >
        )
    }

    renderInput(controlName: ControlEnum, ref?: React.RefObject<HTMLInputElement>) {
        const controls: Record<string, Control> = this.state.formControls;

        if (controls) {
            const control: Control | null = controls[controlName] || null;
            return (
                control
                    ? <Input
                        refValue={ref ? ref : null}
                        type={control.type}
                        label={control.label}
                        placeholder={control.placeholder}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={(event: any) => this.onChangeHandler(event, controlName.toString())}
                    />
                    : null
            );
        }

        return null;
    }
}
