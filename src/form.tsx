import { useFormField } from "./use-form-field"

export type FormValues = {
    fullName?: string
    email?: string,
    birthDate?: string
}

type FormProps = {
    onSubmit: (values: FormValues) => void
}

export function Form({ onSubmit }: FormProps) {
    const fullNameField = useFormField("",
        {
            formatter: (v) => v
                .replace(/\d+/g, "")
                .split(/\s+/)
                .map((word) =>
                    word.slice(0, 1).toUpperCase()
                    + word.slice(1).toLocaleLowerCase()
                )
                .join(' '),

            validator: (v) => {
                if (!v) return "Это обязательное поле"
                return null
            }
        }
    );

    const birthDateField = useFormField("",
        {
            validator: (v) => {
                if (!v) return "Это обязательное поле"
                return null
            }
        }
    );

    const emailField = useFormField("",
        {
            validator: (v) => {
                if (!v.includes("@"))
                    return "Некорректный адрес электронной почты"

                return null
            }
        }
    );

    return <>
        <input
            value={fullNameField.value}
            onChange={({ target }) => {
                fullNameField.setValue(target.value.replace(/\d+/g, ""))
            }}
            onBlur={() => {
                fullNameField.format();
                if (!fullNameField.validate())
                    onSubmit({ fullName: fullNameField.value })
            }}
        />
        <div>
            {fullNameField.error}
        </div>

        <input
            value={birthDateField.value}
            onChange={({ target }) => birthDateField.setValue(target.value.replace(/\d+/g, ""))}
            onBlur={() => {
                if (!birthDateField.validate())
                    onSubmit({ birthDate: birthDateField.value })
            }}
        />
        <div>
            {birthDateField.error}
        </div>

        <input
            value={emailField.value}
            onChange={({ target }) => emailField.setValue(target.value)}
            onBlur={() => {
                if (!emailField.validate())
                    onSubmit({ email: emailField.value })
            }}
        />
        <div>
            {emailField.error}
        </div>
    </>
}