import React from 'react';

export default function InboxPageLayout(prop) {
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
