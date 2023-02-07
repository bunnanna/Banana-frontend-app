const dropDownStyle = e => {

    return {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      boxShadow: state.isFocused ? null : null,
      margin:"0",
      width: `30rem`,
      minWidth:"20rem",
      fontSize: `${e}rem`,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      padding: '0 6px',
      fontSize: `${e}rem`,
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
      fontSize: `${e}rem`,
    }),
    indicatorSeparator: state => ({
      display: 'none',
      fontSize: `${e}rem`,
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      fontSize: `${e}rem`,
    }),
    menu:(provided,state)=>({
      ...provided,
      fontSize: `${e}rem`,
    })
  };}

  export {dropDownStyle}