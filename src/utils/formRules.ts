const emailRule = {
  pattern: {
    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Please enter a valid email address'
  },
  required: {
    value: true,
    message: 'Email is required'
  }
}

export { emailRule }
