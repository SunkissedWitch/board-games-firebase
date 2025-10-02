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

const addressRules = {
  city: {
    required: "Select city",
  },
  address: {
    required: 'Enter your address',
    minLength: { value: 4, message: 'Too short address'}
  },
  tel: {
    required: 'Enter your phone number'
  },
  warehouseType: {
    required: "Select warehouse type",
  },
  warehouseRef: {
    required: "Select warehouse"
  },
  username: {
    required: "Enter the recipient's name"
  },
}

export { emailRule, addressRules }
