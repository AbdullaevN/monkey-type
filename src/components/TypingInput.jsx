import React from 'react';

const TypingInput = React.forwardRef(({ onChange }, ref) => (
  <input type="text" className='input-field' ref={ref} onChange={onChange} />
));

export default TypingInput;
