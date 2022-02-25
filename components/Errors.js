import Link from "next/link";
import classes from "../styles/Error.module.css";

export default function Error({ title }) {
  return (
    <div className={classes.stripe}>
      <div className={classes.stripeInner}>{title}</div>
    </div>
  );
}
