import * as SimpleIcons from 'simple-icons'
import type { SimpleIcon as SimpleIconType } from 'simple-icons'

type SimpleIconProps = {
  name: string;
  size?: number;
  color?: string;
}

const SimpleIcon = ({ name, size = 24, color = 'currentColor' }: SimpleIconProps) => {
  const icon = SimpleIcons[name as keyof typeof SimpleIcons] as SimpleIconType | undefined;
  if (!icon) return <span>Icon not found</span>
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      <path d={icon.path}></path>
    </svg>
  )
  
};

export default SimpleIcon;