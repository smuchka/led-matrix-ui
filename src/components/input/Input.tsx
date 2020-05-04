import React from 'react'
import './Input.css';

type InputProps = {
    type: string,
    label: string,
    placeholder: string,
    value: string | number,
    valid: boolean,
    touched: boolean,
    shouldValidate: boolean,
    errorMessage: string,
    onChange: (event: any) => void,
    refValue?: React.RefObject<HTMLInputElement> | null
}

function isValid({ valid, touched, shouldValidate }: InputProps) {
    return !valid && shouldValidate && touched;
}

export default function Input(props: InputProps) {

    const inputType = props.type || 'text';
    const placeholder = props.placeholder || '';
    const cls = ['input-container'];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isValid(props)) {
        cls.push('validation-error');
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                placeholder={placeholder}
                value={props.value}
                onChange={props.onChange}
                {... (props.refValue ? { ref: props.refValue } : {})}
            />
        </div>
    )
}
