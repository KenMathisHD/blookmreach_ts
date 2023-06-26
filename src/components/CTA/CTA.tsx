import React from "react";
import { getSelectionValue } from "../../utils/general";
import styles from "./CTA.module.scss";

interface CTA {
  cta: Cta;
  variant: string;
}

export function CTA(props: CTA): React.ReactElement | null {
  const {
    cta: { cta, style },
    variant,
  } = props ?? {};

  const returnStyle = (value: string | undefined) => {
    switch (value) {
      case "Pencil Banner":
        return `${styles.link_pencil}`;
      case "primary":
        return `btn btn-primary`;
      case "secondary":
        return `btn btn-secondary`;
      case "link_red":
        return `${styles.link_red}`;
      case "link_drk":
        return `${styles.link_drk}`;
      default:
        return `${styles.link}`;
    }
  };

  return (
    <>
      {cta && (
        <span
          className={
            variant
              ? returnStyle(variant)
              : returnStyle(getSelectionValue(style))
          }
        >
          <b>{cta}</b>
        </span>
      )}
    </>
  );
}
