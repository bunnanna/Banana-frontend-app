const dropDownStyle = e => {
    const scaleh = Math.floor(e/2)
    return {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: `${scaleh*30+50}px`,
      boxShadow: state.isFocused ? null : null,
      margin:"0 10px",
      width: `${300}px`,
      minWidth:"200px"
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: `${scaleh*30+40}px`,
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
      height: `${scaleh*30+40}px`,
    }),
  };}

  export {dropDownStyle}