import { useEffect, useState } from "react"
import { ComboBox } from "../ComboBox"
import type { CityProps } from "./AddressForm"
import { npRESTcall } from "../../NovaPostApi/npRestCall"
import type { ErrorOption } from "react-hook-form"

interface SelectProps {
  onChange?: (value: CityProps | null) => void
  value?: CityProps | null
  error?: ErrorOption
}

export const CitySelect = ({ onChange, value, error }: SelectProps) => {
  const [citiesList, setCitiesList] = useState<CityProps[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const getOptionLabel = (value: CityProps) => value.Description

  const getOptionDescription = (value: CityProps) => value.SettlementTypeDescription

  const onQueryChange = (q: string) => {
    setQuery(q)
  }

  useEffect(() => {
    if (query.length < 3) {
      setCitiesList([])
      return
    }

    let ignore = false
    const fetchCities = async () => {
      console.log("fetchCities", query)
      setLoading(true)
      try {
        const data = await npRESTcall({
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: { FindByString: query, Limit: 20 },
        })
        if (!ignore && data.success) {
          setCitiesList(data.data as CityProps[])
        }
      } catch (err) {
        console.error("Fetch cities error:", err)
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(fetchCities, 400) // debounce
    return () => {
      ignore = true
      clearTimeout(timeout)
    }
  }, [query, npRESTcall])

  return (
    <ComboBox
      value={value}
      onChange={onChange}
      options={citiesList ?? []}
      label='Select City'
      placeholder='Start typing to search...'
      onQueryChange={onQueryChange}
      loading={loading}
      getOptionLabel={getOptionLabel}
      getOptionDescription={getOptionDescription}
      error={error}
    />
  )
}
