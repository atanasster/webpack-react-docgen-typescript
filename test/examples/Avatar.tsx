import React from 'react';
import { IAvatarProps } from './AvatarProps';

/**
* An image with some text, can be used as a user Avatar image<br/>
* `import { Avatar } from 'grommet-controls;'`<br/>
* `<Avatar image='...' />`<br/>
*/
export const Avatar = ({
 image, title, subTitle, ...rest
}: IAvatarProps) => (
  <div>
    <img
      src={image}
      {...rest}
    />
    <div>
      <label>{title}</label>
      <label>{subTitle}</label>
    </div>
  </div>
);

