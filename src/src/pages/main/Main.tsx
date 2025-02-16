import { JSX } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[]
};

function Main({children} : Props) {
    return (
        <div className='flex flex-1'>
            {children}
        </div>
    );
}

export default Main;