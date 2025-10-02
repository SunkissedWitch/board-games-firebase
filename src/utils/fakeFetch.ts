function resolveAfterMSeconds<T>(x: T, ms = 2000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x)
    }, ms)
  })
}

export async function fakeFetch<T>(fakeResponse: T, delay = 2000): Promise<T> {
  const x = await resolveAfterMSeconds(fakeResponse, delay)
  return x
}
