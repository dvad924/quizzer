export const associator = (state, action) => {
  state.associateChange(action.name, action.consequence)
}
