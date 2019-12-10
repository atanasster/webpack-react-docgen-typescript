import React, { FC } from 'react';

export interface Props1 {
  /** Label on Props1 */
  label: string;

  /** Another property */
  property1?: number;

  /** Another property */
  property2?: number;

}

export interface Props2 {
  /** Label on Props2 */
  label: string;
}

/** Component description imported from comments inside the component file
 * This React component has its own properties but also accepts all the html `button` attributes.
 */
export const OrProps: FC<Props1 | Props2> = ({
  label,
  ...rest
}) => (
  <button type="button" {...rest}>
    {label}
  </button>
);
