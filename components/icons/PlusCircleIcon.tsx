import { FC } from 'react'

interface IconProps {
  size?: number
  color?: string
}

const PlusCircleIcon: FC<IconProps> = ({ size = 20, color = 'white' }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5 6.66667V13.3333M7.16669 10H13.8334M18.8334 10C18.8334 14.6024 15.1024 18.3333 10.5 18.3333C5.89765 18.3333 2.16669 14.6024 2.16669 10C2.16669 5.39763 5.89765 1.66667 10.5 1.66667C15.1024 1.66667 18.8334 5.39763 18.8334 10Z"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default PlusCircleIcon
