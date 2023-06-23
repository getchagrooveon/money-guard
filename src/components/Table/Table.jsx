import React from 'react';

const styleLi = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px',
};
const styleBox = backgroundColor => ({
  width: '24px',
  height: '24px',
  backgroundColor,
});
export default function Table({ data }) {
  return (
    <ul>
      {data?.map(e => (
        <li key={e.name} style={styleLi}>
          <div style={styleBox(e.color)}></div>
          <div>{e.name}</div>
          <div>{e.total}</div>
        </li>
      ))}
    </ul>
  );
}
