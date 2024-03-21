import { useCallback, useMemo, useRef, useState } from "react"

export function useFormField<T>(
    initialValue: T,
    {
        validator: defaultValidator,
        formatter: defaultFormatter
    }: {
        validator?: (value: T) => string | null,
        formatter?: (value: T) => T
    } = {}
) {
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState(null as string | null)

    const validate = (validator = defaultValidator) => {
        if (!validator)
            return null

        const error = validator(value)
        setError(error)
        return error
    }

    const format = (formatter = defaultFormatter) => {
        if (formatter)
            setValue((value) => formatter(value))
    }

    return {
        value,
        setValue: (v: T) => { setValue(v) },
        error,
        validate,
        format
    }
}