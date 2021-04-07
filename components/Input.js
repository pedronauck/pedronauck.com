import { forwardRef } from 'react'

import {
  Box,
  Input as BaseInput,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

const Input = forwardRef((props, ref) => {
  const { error } = props

  return (
    <div>
      <InputGroup>
        {props.icon && (
          <InputLeftElement
            pointerEvents="none"
            children={
              <Box mt={2} color="gray.600">
                {props.icon}
              </Box>
            }
          />
        )}
        <BaseInput ref={ref} size="lg" isInvalid={Boolean(error)} {...props} />
      </InputGroup>
      {error && (
        <div className="mt-2 text-red-300 text-sm">{error.message}</div>
      )}
    </div>
  )
})

export default Input
