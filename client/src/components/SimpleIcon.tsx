import { siGithub, siFacebook, siX, siReddit, siMastodon, siTelegram } from 'simple-icons'
// import type { SimpleIcon as SimpleIconType } from 'simple-icons'

type SimpleIconProps = {
  name: string;
  size?: number;
  color?: string;
}

const SimpleIcon = ({ name, size = 24, color = 'currentColor' }: SimpleIconProps) => {
  // const icon = SimpleIcons[name as keyof typeof SimpleIcons] as SimpleIconType | undefined;
  // if (!icon) return <span>Icon not found</span>
  
  if (name === 'Telegram') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={siTelegram.path}></path>
      </svg>
    )
  }

  if (name === 'Mastodon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={siMastodon.path}></path>
      </svg>
    )
  }

  if (name === 'Reddit') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={siReddit.path}></path>
      </svg>
    )
  }

  if (name === 'GitHub') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={siGithub.path}></path>
      </svg>
    )
  }

  if (name === 'Facebook') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={siFacebook.path}></path>
      </svg>
    )
  }

  if (name === 'X') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={siX.path}></path>
      </svg>
    )
  }

  return null;
  
};

// import * as SimpleIcons from 'simple-icons'
// import type { SimpleIcon as SimpleIconType } from 'simple-icons'

// type SimpleIconProps = {
//   name: string;
//   size?: number;
//   color?: string;
// }

// const SimpleIcon = ({ name, size = 24, color = 'currentColor' }: SimpleIconProps) => {
//   const icon = SimpleIcons[name as keyof typeof SimpleIcons] as SimpleIconType | undefined;
//   if (!icon) return <span>Icon not found</span>
  
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill={color}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <title>{name}</title>
//       <path d={icon.path}></path>
//     </svg>
//   )
  
// };

export default SimpleIcon;