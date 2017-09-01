import React from 'react';

export default function IndexPageLayout(prop) {
  return (
    <div key="IndexPageLayout">
      <div key="0">
        {prop.children[0]}
      </div>
      <div key="1">
        {prop.children[2]}
      </div>
      <div key="2">
        {prop.children[1]}
      </div>
    </div>
  );
}
