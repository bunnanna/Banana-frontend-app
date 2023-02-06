const dropDownStyle = e => {

    return {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      boxShadow: state.isFocused ? null : null,
      margin:"0 10px",
      width: `30rem`,
      minWidth:"20rem",
      fontSize: `${e}rem`,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
    }),
  };}

  export {dropDownStyle}