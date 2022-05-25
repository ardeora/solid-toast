import { iconCircle, pingCircle, icon, infoDot } from "../util"
import { IconProps } from "../types";

export const Error = (props: IconProps) => {

  const mainCircle = `${iconCircle} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
  const secondaryCircle = `${pingCircle} 1s cubic-bezier(0, 0, 0.2, 1) forwards`;
  const infoDash = `${icon} 0.1s ease-in forwards`
  const infoCircle = `${infoDot} 0.2s ease-out forwards`

  return (
    <svg style={{overflow: 'visible'}} viewBox="0 0 32 32">
      <circle style={{animation: mainCircle, 'transform-origin': '50% 50%', 'animation-delay': '100ms', opacity: 0}} fill={props.primary || "#FF3B30"} cx="16" cy="16" r="16"/>
      <circle style={{animation: secondaryCircle, 'transform-origin': '50% 50%', 'animation-delay': '320ms'}} fill={props.primary || "#FF3B30"} cx="16" cy="16" r="12"/>
      <path style={{animation: infoDash, 'stroke-dasharray': 9, 'stroke-dashoffset': 9, 'animation-delay': '200ms'}} fill="none" stroke={props.secondary || "#FFFFFF"} stroke-width="4" stroke-linecap="round" d="M16,7l0,9"/>
      <circle style={{animation: infoCircle, 'animation-delay': '320ms', opacity: 0}} fill={props.secondary || "#FFFFFF"}  cx="16" cy="16" r="2.5"/>
    </svg>
  )
}