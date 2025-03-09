import { SignUp } from '@clerk/nextjs'

export default function PageSignUp() {
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <SignUp />
    </div>
  )
}