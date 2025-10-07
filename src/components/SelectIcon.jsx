import { Select, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import * as Unicons from "@iconscout/react-unicons"

const SelectIcon = ({ onChange, value }) => {
    return (
        <Stack >
            <Text>Selecciona un ícono</Text>
            <Select placeholder='Selecciona un ícono' onChange={onChange} value={value}>
                {Object.keys(Unicons).map((iconName) => (
                    <option key={iconName} value={iconName}>
                        {iconName}
                    </option>
                ))}

            </Select>
        </Stack>
    )
}

export default SelectIcon