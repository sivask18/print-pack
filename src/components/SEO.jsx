import React from "react";
import { Helmet } from "react-helmet";

const SITE_NAME = "Printomax";
const SITE_URL = "https://www.printomax.in";
const DEFAULT_IMAGE = `${SITE_URL}/assets/PressOne.jpg`;

/**
 * Reusable SEO component for per-page meta tags.
 *
 * @param {string}  title       - Page title (without site name; it is appended automatically).
 * @param {string}  description - Meta description (~150-160 chars recommended).
 * @param {string}  keywords    - Comma separated keywords.
 * @param {string}  path        - Page path used to build the canonical URL (e.g. "/about").
 * @param {string}  image       - Absolute URL of the social share image.
 */
const SEO = ({
  title,
  description,
  keywords,
  path = "/",
  image = DEFAULT_IMAGE,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
