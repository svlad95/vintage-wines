export const convertToUsd = (number) => {
  return {
    type: 'CONVERT_TO_USD',
    payload: number,
  }
}
export const convertToEur = (number) => {
  return {
    type: 'CONVERT_TO_EUR',
    payload: number,
  }
}

export const convertToRon = (number) => {
  return {
    type: 'CONVERT_TO_RON',
    payload: number,
  }
}

export const increaseCart = (number) => {
  return {
    type: 'INCREASE',
    payload: number,
  }
}
export const decreaseCart = (number) => {
  return {
    type: 'DECREASE',
    payload: number,
  }
}
