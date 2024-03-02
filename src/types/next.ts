import { type Metadata, type ResolvingMetadata } from "next"

export type GenerateMetadataProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

/**
 * Function type for generateMetadata
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function}
 * // FIXME: This is throwing errors when building
 */
export type GenerateMetadata = (
  props: GenerateMetadataProps,
  parent?: ResolvingMetadata
) => Promise<Metadata>
