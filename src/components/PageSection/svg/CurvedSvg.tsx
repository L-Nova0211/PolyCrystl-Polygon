import React from 'react'
import styled from 'styled-components'
import { Svg, SvgProps } from '@crystals/uikit'

interface StyledSvgProps {
  svgFill?: string
}

const sharedStyles = `
svg {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const CurvedSvg: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1200 66" {...props}>
      <g filter="url(#intersect_filter0_d)">
        <path d="M1200 23.9232C1050.53 39.6633 837.034 49.5127 600 49.5127C362.965 49.5127 149.466 39.6633 0 23.9232V0.512695H1200V23.9232Z" />
      </g>
      <defs>
        <filter
          id="intersect_filter0_d"
          x="-12"
          y="-7.4873"
          width="1224"
          height="73"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </Svg>
  )
}

export default CurvedSvg

export const CurvedSvgTop = styled(CurvedSvg)<StyledSvgProps>`
  ${sharedStyles}
  transform: rotate(180deg);
  margin-bottom: -2px;
  fill: ${({ svgFill, theme }) => svgFill || theme.colors.background};
`

export const CurvedSvgBottom = styled(CurvedSvg)<StyledSvgProps>`
  ${sharedStyles}
  margin-top: -2px;
  fill: ${({ svgFill, theme }) => svgFill || theme.colors.background};
`
