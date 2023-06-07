import React from "react";
import { Container } from "react-bootstrap";
import { ContainerItem, getContainerItemContent } from "@bloomreach/spa-sdk";
import { BrProps } from "@bloomreach/react-sdk";

// internal components
import { Link } from "../Link";
import { Image } from "../Image/Image";
import { CTA } from "../CTA/CTA";

// internal utils
import { setSelectionValue } from "../../utils/general";

// styles
import styles from "./Tile.module.scss";

interface Tile {
  titleText?: titleTextFG;
  cta?: Cta;
  analytics?: Anchor;
  textAlignment?: string;
  image?: image;
  shadow?: boolean;
  imageFormat: string;
}

export function Tile(props: Tile): React.ReactElement | null {
  const {
    titleText: titleTextFG,
    cta,
    image,
    analytics: link,
    imageFormat,
    shadow,
    textAlignment,
  } = props;

  if (image) {
    if (image.imgfit && imageFormat === "Circular")
      setSelectionValue(image.imgfit, "center");
  }

  const imageFormatStyles = (imageFormat: string) => {
    if (imageFormat !== "Default")
      return " " + styles[imageFormat.toLowerCase()];
    return "";
  };

  const textAlign = () =>
    `text-${textAlignment ? `${textAlignment.toLowerCase()}` : "center"}`;

  const imageContainer = () => {
    return image ? (
      <div
        className={`${styles["tile-image-cont"]}${imageFormatStyles(
          imageFormat
        )}${shadow ? " " + styles.shadow : ""} col-12 px-0`}
      >
        <Image image={image} imageFormat={imageFormat}></Image>
      </div>
    ) : null;
  };

  const titleOutput = () => {
    if (!titleTextFG?.titleText) return;
    const { title } = titleTextFG.titleText;
    return (
      title && (
        <h3 className={`font-weight-bold ${textAlign()} mx-auto pt-3`}>
          {title}
        </h3>
      )
    );
  };

  const ctaOutput = () => {
    return cta ? <CTA cta={cta}></CTA> : null;
  };

  const textContainer = (
    titleNode?: React.ReactNode,
    ctaNode?: React.ReactNode
  ) => {
    if (!titleTextFG?.titleText) return;
    const { text } = titleTextFG.titleText;
    return (
      text && (
        <div
          className={`${styles["tile-text-cont"]} ${textAlign()} col-12 py-3`}
        >
          {titleNode}
          {text && <div dangerouslySetInnerHTML={{ __html: text.value }}></div>}
          {ctaNode}
        </div>
      )
    );
  };

  const tileOutput = () => {
    if (link && link.href) {
      if (!titleTextFG?.titleText) return;
      const { text } = titleTextFG.titleText;
      if (text && text.value.includes("<a"))
        return (
          <>
            <Link
              link={link}
              className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
            >
              {imageContainer()}
              <div className={`col-12 ${textAlign()}`}>{titleOutput()}</div>
              <div className={`col-12 ${textAlign()}`}>{ctaOutput()}</div>
            </Link>
            {textContainer()}
          </>
        );

      return (
        <Link
          link={link}
          className={`d-flex flex-wrap text-decoration-none mt-2 ${styles.tile}`}
        >
          {imageContainer()}
          {textContainer(titleOutput(), ctaOutput())}
        </Link>
      );
    }

    return (
      <>
        {imageContainer()}
        {textContainer(titleOutput())}
      </>
    );
  };

  return <Container>{tileOutput()}</Container>;
}
