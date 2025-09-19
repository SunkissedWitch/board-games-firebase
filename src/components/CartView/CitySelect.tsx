import { useEffect, useState } from "react"
import { ComboBox } from "../ComboBox"
import type { CityProps } from "./AddressForm"
import { fakeFetch } from "../../utils/fakeFetch"
import mockdata from "./mockdata.json"

interface SelectProps {
  onChange?: (value: CityProps | null) => void
  value?: CityProps | null
}

export const CitySelect = ({ onChange, value }: SelectProps) => {
  const [citiesList, setCitiesList] = useState<CityProps[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")

  const NP_API = import.meta.env.VITE_NOVA_API
  const NP_API_KEY = import.meta.env.VITE_NOVA_API_KEY
  const getOptionLabel = (value: CityProps) => value.Description

  const getOptionDescription = (value: CityProps) => {
    if (value.SettlementTypeDescription !== "місто") {
      return `(${value.SettlementTypeDescription}, ${value.AreaDescription} область, ${value.RegionsDescription} район)`
      // return `${value.Description} (${value.SettlementTypeDescription}, ${value.RegionsDescription})`
    }
    return `(${value.SettlementTypeDescription}, ${value.AreaDescription} область)`
  }

  console.log("NP_API", NP_API, NP_API_KEY)

  const onQueryChange = (q: string) => {
    console.log("query", q)
    setQuery(q)
  }

  useEffect(() => {
    if (query.length < 3) {
      setCitiesList([])
      return
    }

    let ignore = false
    const fetchCities = async () => {
      setLoading(true)
      try {
        // const res = await fakeFetch(mockdata, 300)
        // const data = await res.json()
        // if (!ignore && res.success) {
        //   setCitiesList(res.data as CityProps[])
        // }
        const res = await fetch(NP_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: NP_API_KEY,
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: { FindByString: query, Limit: 20 },
          }),
        })
        const data = await res.json()
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
  }, [query, NP_API, NP_API_KEY])

  return (
    <ComboBox
      value={value}
      onChange={onChange}
      options={citiesList ?? []}
      label='Select City'
      onQueryChange={onQueryChange}
      loading={loading}
      getOptionLabel={getOptionLabel}
      getOptionDescription={getOptionDescription}
    />
  )
}
