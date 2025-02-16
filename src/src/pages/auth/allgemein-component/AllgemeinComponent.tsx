import { Card, Image, Space } from "antd";
import logo from "../../../../assets/logo.svg";
import { JSX } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[]
};

//Common parent component for others
function AllgemeinComponent({children} : Props) {
  return (
    <>
      <div className="flex flex-1 justify-center items-center z-20">
        <div className="bg-white rounded-xl overflow-hidden max-w-90 w-full">
          <div className="bg-neutral-800 flex p-2">
            <Image src={logo} width={60} />
          </div>
          <Card>
            <Space direction="vertical" className="items-center text-center">
              {children}
            </Space>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AllgemeinComponent;