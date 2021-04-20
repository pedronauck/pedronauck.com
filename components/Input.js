import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Box,
  Input as BaseInput,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

import useAnalytics from 'hooks/useAnalytics'

const Input = forwardRef((props, ref) => {
  const { name, value, onBlur } = props
  const { formState } = useFormContext()
  const seg = useAnalytics()
  const error = formState.errors[name]
  const isDirty = formState.dirtyFields[name]

  const handleBlur = (ev) => {
    if (!error && isDirty) seg.track('input_filled', { name, value })
    onBlur(ev)
  }

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
        <BaseInput
          ref={ref}
          size="lg"
          isInvalid={Boolean(error)}
          {...props}
          onBlur={handleBlur}
        />
      </InputGroup>
      {error && (
        <div className="mt-2 text-red-300 text-sm">{error.message}</div>
      )}
    </div>
  )
})

export default Input
