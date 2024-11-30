import { FC } from 'react'

interface IconProps {
  size?: number
  className?: string
}

const MoveIcon: FC<IconProps> = ({ size = 20, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.16667 7.49996L1.66667 9.99996M1.66667 9.99996L4.16667 12.5M1.66667 9.99996H18.3333M7.5 4.16663L10 1.66663M10 1.66663L12.5 4.16663M10 1.66663V18.3333M12.5 15.8333L10 18.3333M10 18.3333L7.5 15.8333M15.8333 7.49996L18.3333 9.99996M18.3333 9.99996L15.8333 12.5"
      stroke="currentColor"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default MoveIcon
