import { Typography } from "antd";
import classes from "./ErrorMessage.module.css";

type ErrorProps = {
  text: string;
};

//einfach a bouncing error message under the fields=) 
function ErrorMessage({ text }: ErrorProps) {
  return (
    <>
      {text.length > 0 && (
        <Typography.Text
          className={classes.anim}
          style={{ fontSize: 12, color: "crimson" }}
        >
          {text}
        </Typography.Text>
      )}
    </>
  );
}

export default ErrorMessage;