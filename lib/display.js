export function actionInTrainerHistory(action) {
  if (action.cards) {
    return '⋅'
  } else if (action.size) {
    return action.size
  } else {
    return action.type[0].toUpperCase()
  }
}