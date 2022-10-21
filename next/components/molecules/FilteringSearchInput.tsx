import { useTranslation } from 'next-i18next'

import SearchIcon from '../../assets/search.svg'
import XIcon from '../../assets/x-alt.svg'
import TextField from '../atoms/TextField'

export type FilteringSearchInputProps = {
  value: string
  onChange: (value: string) => void
}

const FilteringSearchInput = ({ value, onChange }: FilteringSearchInputProps) => {
  const { t } = useTranslation()

  const handleCancelClick = () => {
    onChange('')
  }

  return (
    <TextField
      id="with-text-left-icon"
      value={value}
      leftSlot={<SearchIcon className="p-2" />}
      rightSlot={
        value ? (
          <button type="button" className="p-2" onClick={handleCancelClick}>
            <XIcon />
          </button>
        ) : null
      }
      placeholder={t('general.searchPlaceholder')}
      aria-label={t('general.searchField')}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default FilteringSearchInput
