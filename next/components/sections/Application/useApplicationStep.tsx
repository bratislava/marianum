import Button from '@components/atoms/Button'
import Spinner from '@components/atoms/Spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { DeepPartial, DefaultValues, FieldValues, useForm, UseFormHandleSubmit } from 'react-hook-form'
import Turnstile from 'react-turnstile'
import * as yup from 'yup'
import { AnySchema } from 'yup'

export const useApplicationStep = <T extends FieldValues>({
  yupShape,
  values,
  defaultValues,
  onFormChange,
}: {
  yupShape: Record<keyof T, AnySchema>
  values?: DeepPartial<T>
  defaultValues: T
  onFormChange: (values: DeepPartial<T>) => void
}) => {
  const schema = useMemo(() => yup.object().shape(yupShape).required(), [yupShape])

  const useFormResult = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: (values ?? defaultValues) as DeepPartial<T> as DefaultValues<T>,
  })

  useEffect(() => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const subscription = useFormResult.watch((value) => onFormChange(value))
    return () => subscription.unsubscribe()
  }, [onFormChange, useFormResult, useFormResult.watch])

  return useFormResult
}

export const ApplicationStepWrapper = <T extends FieldValues>({
  handleSubmit,
  onContinue,
  sendStep = false,
  sending,
  children,
  captchaRefreshDate,
}: PropsWithChildren<{
  handleSubmit: UseFormHandleSubmit<T>
  onContinue: (values: T, captchaToken?: string) => void
  sendStep?: boolean
  sending?: boolean
  captchaRefreshDate?: number
}>) => {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const turnstileRefreshing = useMemo(
    () => (
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string}
        onVerify={(token) => setTurnstileToken(token)}
        onError={() => setTurnstileToken(null)}
        onTimeout={() => setTurnstileToken(null)}
        onExpire={() => setTurnstileToken(null)}
        className="mb-2"
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [captchaRefreshDate],
  )

  console.log(
    captchaRefreshDate,
    turnstileRefreshing,
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
  )
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((values) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onContinue(values, sendStep ? turnstileToken! : undefined),
      )}
      className="w-full"
    >
      <div>
        {children}

        {sendStep ? (
          <>
            {turnstileRefreshing}

            <Button className="w-full" type="submit" disabled={sending || !turnstileToken}>
              <div className="flex items-center gap-2">
                {sending ? <Spinner /> : null}
                <span>Odoslať</span>
              </div>
            </Button>
          </>
        ) : (
          <Button className="w-full" type="submit">
            Pokračovať
          </Button>
        )}
      </div>
    </form>
  )
}
