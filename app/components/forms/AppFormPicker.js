import { useFormikContext } from 'formik'
import React from 'react'
import { View, Text } from 'react-native'

import AppPicker from '../AppPicker'
import ErrorMessage from './ErrorMessage'

export default function AppFormPicker({ icon, items, name, placeholder, width, PickerItemComponent }) {
    const { errors, setFieldValue, touched, values } = useFormikContext()
    return (
        <>
            <AppPicker 
                items={items}
                onSelectItem={(item) => setFieldValue(name, item.label)}
                placeholder={placeholder}
                selectedItem={values[name]}
                width={width}
                icon={icon}
                PicketItemComponent={PickerItemComponent}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}
