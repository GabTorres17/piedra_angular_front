export const getDynamicPrefix = (name: string) => {
  const feminineItems = ['Joyas', 'Pulseras', 'Promociones']
  return feminineItems.some((item) =>
    name.toLowerCase().includes(item.toLowerCase()),
  )
    ? 'Todas las'
    : 'Todos los'
}
