import { JSX } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[]
};

//This is for wrapping all the content to be always the same size
function Main({children} : Props) {
    return (
        <div className='flex flex-1'>
            {children}
        </div>
    );
}

export default Main;