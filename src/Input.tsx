import React from "react";

export interface InputProps<T> extends Omit<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value">, "onChange"> {
    value: T
    onChange: (value: T) => void
}

const Input: React.FunctionComponent<InputProps<string>> = ({ onChange, ...props }) => {
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, [onChange])
    return <input type="text" onChange={handleChange} {...props} />
}

export default Input

export const NumberInput: React.FunctionComponent<InputProps<number>> = ({ value, onChange, ...props }) => {
    const [valueString, setValueString] = React.useState(value.toString())
    const parsedValue = React.useMemo(
        () => Number(valueString),
        [valueString]
    )
    React.useEffect(() => {
        onChange(parsedValue)
    }, [parsedValue])
    React.useEffect(() => {
        if (value === parsedValue) return
        setValueString(value.toString())
    }, [value])
    return <Input type="number" value={valueString} onChange={setValueString} {...props} />
}