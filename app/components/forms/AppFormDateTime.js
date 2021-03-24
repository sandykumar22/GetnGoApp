import React from 'react'
import { useFormikContext } from 'formik'

import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'
import AppDateTimeInput from '../AppDateTimeInput'

export default function AppFormDateTime({ name, color, onPress, ...otherProps }) {
    // const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
    return (
        <>
            <AppDateTimeInput
                //onBlur={() => setFieldTouched(title)}
                //onChangeText={handleChange(title)}
                //width={width}
                name={name}
                color={color}
                onPress={onPress}
                {...otherProps}
            />
            {/*<ErrorMessage error={errors[title]} visible={touched[title]} />*/}
        </>
    )
}
