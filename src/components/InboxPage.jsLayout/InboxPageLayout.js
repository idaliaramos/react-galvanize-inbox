import React from 'react';

export default function IndexPageLayout(prop) {
  return (
    <div>
      <div>
        {prop.children[0]}
      </div>
      <div>
        {prop.children[2]}
      </div>
      <div>
        {prop.children[1]}
      </div>
    </div>
  );
}
