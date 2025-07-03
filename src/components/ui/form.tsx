import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  type ControllerProps,
} from 'react-hook-form'

import { cn } from '@/lib/utils'

const Form = FormProvider

const FormFieldContext = React.createContext<{ name: string } | null>(null)

function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: ControllerProps<TFieldValues, TName>,
) {
  return (
    <FormFieldContext.Provider value={{ name: props.name as string }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const FormItemContext = React.createContext<{ id: string } | null>(null)

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = fieldContext
    ? getFieldState(fieldContext.name, formState)
    : { invalid: false }

  const id = itemContext?.id

  return {
    id,
    name: fieldContext?.name,
    formItemId: id ? `${id}-form-item` : undefined,
    formDescriptionId: id ? `${id}-form-item-description` : undefined,
    formMessageId: id ? `${id}-form-item-message` : undefined,
    ...fieldState,
  }
}

function FormLabel({ className, ...props }: React.ComponentProps<'label'>) {
  const { error, formItemId } = useFormField()
  return (
    <label
      htmlFor={formItemId}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        error && 'text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { formItemId } = useFormField()
  return <Slot id={formItemId} {...props} />
}

function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } = useFormField()
  return <p id={formDescriptionId} className={cn('text-xs text-muted-foreground', className)} {...props} />
}

function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message) : children
  if (!body) return null
  return (
    <p id={formMessageId} className={cn('text-xs font-medium text-destructive', className)} {...props}>
      {body}
    </p>
  )
}

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
