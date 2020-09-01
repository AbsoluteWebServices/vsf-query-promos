export default interface QueryPromosState {
  events: {
    [key: string]: boolean
  },
  params: {
    [key: string]: string | string[]
  }
}
