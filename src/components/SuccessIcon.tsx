import { iconCircle } from "../util"

export const Sucess = () => {

  const mainCircle = `${iconCircle} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
  forwards`;

  return (
    <svg style={{overflow: 'visible'}} viewBox="0 0 32 32">
      <circle style={{animation: mainCircle, 'transform-origin': '50% 50%', 'animation-delay': '100ms'}}  fill="#34C759" cx="16" cy="16" r="16"/>
      <circle fill="#34C759" cx="16" cy="16" r="12"/>
      <path fill="none" stroke="#FCFCFC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M9.8,17.2
        l3.8,3.6c0.1,0.1,0.3,0.1,0.4,0l9.6-9.7"/>
    </svg>
  )
}