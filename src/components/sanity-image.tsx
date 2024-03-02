import Image, { type ImageProps } from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type Image as SanityImageType } from "sanity"

/**
 * Image component to render images from Sanity CMS. Uses next/image.
 * Note: Has 'fill' property set to `true`'.
 */
export function SanityImage({
  src,
  alt,
  height,
  width,
  ...otherProps
}: { src: SanityImageType } & Omit<ImageProps, "fill" | "src" | "srcSet">) {
  const srcUrlBuilder = (src: SanityImageType) => {
    const base = urlForImage(src).fit("crop")
    const baseWithDimensions =
      height && width ? base.width(Number(width)).height(Number(height)) : base
    return baseWithDimensions.url()
  }

  return <Image src={srcUrlBuilder(src)} fill {...otherProps} alt={alt} />
}
