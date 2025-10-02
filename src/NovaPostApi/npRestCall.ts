interface NovaPoshtaRequest<TProps = Record<string, unknown>> {
  modelName: string
  calledMethod: string
  methodProperties?: TProps
}

interface NovaPoshtaResponse<TData> {
  success: boolean
  data: TData[]
  errors: string[]
  warnings: string[]
  info: string[]
  messageCodes: string[]
  errorCodes: string[]
  warningCodes: string[]
  infoCodes: string[]
}

const NP_API = import.meta.env.VITE_NOVA_API
const NP_API_KEY = import.meta.env.VITE_NOVA_API_KEY

export async function npRESTcall<TResponse, TProps = Record<string, unknown>>(
  request: NovaPoshtaRequest<TProps>
): Promise<NovaPoshtaResponse<TResponse>> {
  const res = await fetch(NP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: NP_API_KEY,
      ...request,
    }),
  })
  const data: NovaPoshtaResponse<TResponse> = await res.json()
  return data
}
