import { useEffect, useState } from "react"
import { ComboBox } from "../ComboBox"
import { npRESTcall } from "../../NovaPostApi/npRestCall"
import type { WarehouseProps } from "./AddressForm"
import type { ErrorOption } from "react-hook-form"

interface WarehouseSelectProps {
  onChange?: (value: WarehouseProps | null) => void
  value?: WarehouseProps | null
  cityRef: string
  typeOfWarehouseRef: string
  error?: ErrorOption
}

export const WarehouseSelect = ({ onChange, value, cityRef, typeOfWarehouseRef, error }: WarehouseSelectProps) => {
  const [warehouseList, setWarehouseList] = useState<WarehouseProps[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")

  const getOptionLabel = (value: WarehouseProps) => value.Description

  const onQueryChange = (q: string) => setQuery(q)

  useEffect(() => {
    let ignore = false
    const fetchCities = async () => {
      setLoading(true)
      try {
        const data = await npRESTcall({
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            FindByString: query,
            CityRef: cityRef,
            Page: "1",
            Limit: "50",
            Language: "UA",
            TypeOfWarehouseRef: typeOfWarehouseRef,
          },
        })
        if (!ignore && data.success) {
          setWarehouseList(data.data as WarehouseProps[])
        }
      } catch (err) {
        console.error("Fetch Warehouses error:", err)
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(fetchCities, 400) // debounce
    return () => {
      ignore = true
      clearTimeout(timeout)
    }
  }, [query, npRESTcall, cityRef, typeOfWarehouseRef])

  return (
    <ComboBox
      value={value}
      onChange={onChange}
      options={warehouseList ?? []}
      label='Select Warehouse'
      placeholder='Start typing to search...'
      onQueryChange={onQueryChange}
      loading={loading}
      getOptionLabel={getOptionLabel}
      error={error}
    />
  )
}
