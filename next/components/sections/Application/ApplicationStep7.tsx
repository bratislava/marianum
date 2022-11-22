import FormCheckbox from '@components/atoms/Forms/FormCheckbox'
import MLink from '@components/atoms/MLink'
import TextField from '@components/atoms/TextField'
import { ApplicationStepComponentProps } from '@components/sections/Application/application.types'

import { ApplicationTypes } from './application-shared.types'
import { step7YupShape } from './application-shared.yup'
import { useApplicationStep } from './useApplicationStep'

const defaultValues: ApplicationTypes.Step7Model = {
  poznamka: '',
  suhlasSOdoslanim: false,
  suhlasSOsobnymiUdajmi: false,
  suhlasNewsletter: false,
}

const ApplicationStep7 = ({
  values,
  onContinue,
  onFormChange,
  sending,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step7>) => {
  const {
    register,
    control,
    formState: { errors },
    Wrapper,
  } = useApplicationStep({
    yupShape: step7YupShape,
    values,
    defaultValues,
    onContinue,
    onFormChange,
    sendStep: true,
    sending,
  })

  return (
    <Wrapper>
      <h3 className="mb-3 md:mb-6">Poznámka</h3>
      <TextField area {...register('poznamka')} />

      <h3 className="mt-8 mb-4">Súhlasy</h3>
      <div className="grid gap-4 pb-4 md:pb-6">
        <FormCheckbox name="suhlasSOdoslanim" control={control} errors={errors}>
          Súhlasím s vyhlásením o{' '}
          <MLink href="/ziadost/suhlasy" variant="regular" noArrow target="_blank">
            <span>záväznosti odoslanej žiadosti a platnosti údajov v nej uvedených</span>
          </MLink>
          . *
        </FormCheckbox>
        <FormCheckbox name="suhlasSOsobnymiUdajmi" control={control} errors={errors}>
          Súhlasím so{' '}
          <MLink href="/ziadost/suhlasy" variant="regular" noArrow target="_blank">
            <span>spracovaním osobných údajov</span>
          </MLink>
          . *
        </FormCheckbox>
        <FormCheckbox name="suhlasNewsletter" control={control} errors={errors}>
          Súhlasím so{' '}
          <MLink href="/ziadost/suhlasy" variant="regular" noArrow target="_blank">
            <span>
              spracovaním osobných údajov na marketingové účely a registráciou na odber noviniek
            </span>
          </MLink>
        </FormCheckbox>
      </div>
    </Wrapper>
  )
}

export default ApplicationStep7
