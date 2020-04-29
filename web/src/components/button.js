import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";

const StyledButton = styled.button(tw`
  relative
  w-64 min-w-full
  flex justify-center
  py-2 px-4
  border border-transparent
  text-sm leading-5 font-medium
  rounded-md
  text-white
  bg-indigo-600
  hover:bg-indigo-500
  focus[outline-none border-indigo-700 shadow-outline-indigo]
  active:bg-indigo-700
  transition duration-150 ease-in-out
`);

const StyledIconWrapper = styled.span(tw`
  absolute left-0 inset-y-0
  flex items-center
  pl-3
`);

const StyledIcon = styled.svg(tw`
  h-5 w-5
  text-indigo-500
  group-hover:text-indigo-400
  transition ease-in-out duration-150
`);

const Button = ({ className, children, ...props }) => (
  <StyledButton {...props} className={className}>
    <StyledIconWrapper>
      <StyledIcon fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </StyledIcon>
    </StyledIconWrapper>
    {children}
  </StyledButton>
);

export default Button;
