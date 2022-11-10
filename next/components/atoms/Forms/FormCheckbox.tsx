import { ErrorMessage } from '@hookform/error-message'
import get from 'lodash/get'
import React, { ComponentProps, PropsWithChildren } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import Checkbox from '../Checkbox'

// Types are not worth the effort.
type FormCheckboxProps = Omit<
  ComponentProps<typeof Checkbox>,
  'isSelected' | 'onChange' | 'onBlur'
> &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseControllerProps<any> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any // TODO: type
  }

const FormCheckbox = ({ children, errors, ...props }: PropsWithChildren<FormCheckboxProps>) => {
  const {
    field: { value, onChange, onBlur },
  } = useController(props)

  const hasError = Boolean(get(errors, props.name))

  return (
    <>
      <Checkbox
        {...props}
        isSelected={value}
        onChange={onChange}
        onBlur={onBlur}
        hasError={hasError}
      >
        {children}
      </Checkbox>
      {props.name && errors ? <ErrorMessage errors={errors} name={props.name} /> : null}
    </>
  )
}

export default FormCheckbox