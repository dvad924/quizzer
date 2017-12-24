const receiveData = (name, d) => {
  return {
    type: name,
    payload: d
  }
}

export default receiveData
