import React from 'react';

export default function IndexPageLayout(prop) {
  return (
    <div key="IndexPageLayout">
      {prop.children[0]}
      {prop.children[2]}
      {prop.children[1]}
    </div>
  );
}
