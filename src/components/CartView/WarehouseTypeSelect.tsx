import { useEffect, useState } from "react"
import type { SelectHTMLAttributes } from "react"
import type { WarehouseTypeProps } from "./AddressForm"
import { npRESTcall } from "../../NovaPostApi/npRestCall"

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  onChange: (value: WarehouseTypeProps["Ref"] | null) => void
  value: WarehouseTypeProps["Ref"] | null
}

export const WarehouseTypeSelect = ({ onChange, value, ...props }: SelectProps) => {
  const [warehouseTypesList, setWarehouseTypesList] = useState<WarehouseTypeProps[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getOptionLabel = (value: WarehouseTypeProps) => value.Description

  useEffect(() => {
    const fetchWarehouseTypesList = async () => {
      setLoading(true)
      try {
        const data = await npRESTcall({
          modelName: "AddressGeneral",
          calledMethod: "getWarehouseTypes",
          methodProperties: {},
        })
        if (data.success) {
          setWarehouseTypesList(data.data as WarehouseTypeProps[])
        }
      } catch (err) {
        console.error("Fetch warehouses error:", err)
      } finally {
        setLoading(false)
      }
    }
    if (warehouseTypesList !== null) return
    fetchWarehouseTypesList()
  }, [])

  return (
    <select
      {...props}
      value={value || ""}
      onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
      className='select w-full data-[placeholder="true"]:text-current/50'
      data-placeholder={value === null}
    >
      <option key='placeholder' disabled defaultChecked value=''>
        Select warehouse type
      </option>
      {warehouseTypesList?.map((warehouse) => (
        <option key={warehouse.Ref} value={warehouse.Ref}>
          {getOptionLabel(warehouse)}
        </option>
      ))}
    </select>
  )
}
