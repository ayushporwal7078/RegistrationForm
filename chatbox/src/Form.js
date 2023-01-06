import React, {useState, useEffect} from 'react'
import './App.css'
import Select from 'react-select';
import axios from 'axios';


const Form = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (formData.firstName.length < 5) {
      tempErrors.firstName = 'First Name must be at least 5 characters long';
    }
    if (formData.lastName.length < 5) {
      tempErrors.lastName = 'Last Name must be at least 5 characters long';
    }
    if (!formData.email.includes('@')) {
      tempErrors.email = 'Email must be a valid email address';
    }
    if (formData.zipCode.length === 0 || isNaN(formData.zipCode)) {
      tempErrors.zipCode = 'Zip Code must be a number';
    }
    if (!formData.mobile.match(/^\d+$/)) {
      tempErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.state) {
      tempErrors.state = 'State is required';
    }
    if (!formData.country) {
      tempErrors.country = 'Country is required';
    }
    setErrors(tempErrors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate();
    if (Object.keys(errors).length === 0) {
      // Submit form data to API
      axios.post('/api/users', formData)
        .then((response) => {
          console.log(response);

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            address1: '',
            address2: '',
            state: '',
            city: '',
            country: '',
            zipCode: ''
          });
          alert('User created successfully');
        })

        .catch((error) => {
          console.error(error);
        });
    }
  };

  // const [countries, setCountries] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [states, setStates] = useState([]);
  // const [selectedState, setSelectedState] = useState(null);

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const response = await axios.get('https://restcountries.com/v2/all');
  //       setCountries(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchCountries();
  // }, []);
  
  // const getStatesForCountry = async (countryCode) => {
  //   try {
  //     const response = await axios.get(`https://restcountries.com/v2/alpha/${countryCode}`);
  //     setStates(response.data.states);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch list of countries from API
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        // Format countries for react-select
        const options = response.data.map(country => ({ value: country.code, label: country.name }));
        setCountries(options);
      })
      .catch(error => console.error(error));
  }, []); // The empty array as the second argument ensures that this effect only runs once when the component mounts

  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption);
    setIsLoading(true);

    // Fetch list of states for selected country from API
    axios.get(`https://restcountries.com/states?country=${selectedOption.value}`)
      .then(response => {
        // Format states for react-select
        const options = response.data.map(state => ({ value: state.code, label: state.name }));
        setStates(options);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  };

  const handleStateChange = selectedOptions => {
    // Update selected states in state
    setSelectedStates(selectedOptions);
  };

  return (
    <form id="userForm" onSubmit={handleSubmit}>
  <label for="firstName">First Name:</label>
  <input  type="text"
  id="firstName"
        name="firstName"
        minLength="5"
        value={formData.firstName}
        onChange={handleChange}
        required/>
         {errors.firstName && <p>{errors.firstName}</p>}
  <label for="lastName">Last Name:</label>
  <input  type="text"
        name="lastName"
        id="lastName"
        minLength="5"
        value={formData.lastName}
        onChange={handleChange}
        required/>
        {errors.lastName && <p>{errors.lastName}</p>}
  <label for="email">Email Id:</label>
  <input type="email" id="email" name="email" value={formData.email} onChange = {handleChange} required/>
  {errors.email && <p>{errors.email}</p>}
  <label for="address1">Address 1:</label>
  <input type="text" id="address1" name="address1" value={formData.address1} onChange={handleChange} required/>
  {errors.address1 && <p>{errors.address2}</p>}
  <label for="address2">Address 2:</label>
  <input type="text" id="address2" name="address2" value={formData.address2} onChange={handleChange}/>
  {errors.address2 && <p>{errors.address2}</p>}
  <label for="mobile" >Mobile:</label>
      <input
        type="tel"
        id='mobile'
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
      />
      {errors.mobile && <p>{errors.mobile}</p>}

      <label for="country">Country:</label>
      {/* <Select
  options={countries}
  value={selectedCountry}
  onChange={(selectedOption) => {
    setSelectedCountry(selectedOption);
    getStatesForCountry(selectedOption.code);
  }}
/>   */}

<Select
        id="country"
        options={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        isLoading={isLoading}
      />
      {errors.country && <p>{errors.country}</p>}
      <label for="state">State:</label>
  {/* <Select
    options={states}
    value={selectedState}
    onChange={(selectedOption) => setSelectedState(selectedOption)}
  /> */}
  <Select
        id="country"
        options={states}
        value={selectedStates}
        onChange={handleStateChange}
        isLoading={isLoading}
      />
    {errors.state && <p>{errors.state}</p>}
      
  <label for="city">City:</label>
  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
  {errors.city && <p>{errors.city}</p>}
  <label for="zipCode">Zip Code:</label>
  <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} pattern="[0-9]*"/>
  {errors.zipCode && <p>{errors.zip}</p>}
  <input type="submit" value="Submit"/>
  
</form> 

  )
}
 
export default Form