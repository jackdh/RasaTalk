const yup = require('yup');
const validateWrapper = yup.object().shape({
  avatar: yup.string().url(),
  name: yup
    .string()
    .min(2, 'Please enter a longer agent name')
    .max(50, 'Please enter a shorter name (50)')
    .required('Name is required.'),
  subtitle: yup.string().max(100, 'Please enter a shorter subtitle (100)'),
  description: yup.string().max(100, 'Please enter a shorter desc (100)'),
});

const validateAgent = yup.object().shape({
  avatar: yup.string().url(),
  agent: yup
    .string()
    .min(2, 'Please enter a longer agent name')
    .max(50, 'Please enter a shorter name (50)')
    .required('Agent name is required.'),
  subtitle: yup.string().max(100, 'Please enter a shorter subtitle (100)'),
  description: yup.string().max(100, 'Please enter a shorter desc (100)'),
});

module.exports = {
  validateWrapper,
  validateAgent,
};
