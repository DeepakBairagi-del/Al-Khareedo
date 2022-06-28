// import { sanityClient } from "@sanity/client";
// import { ImageUrlBuilder } from "next-sanity-image";

// export const client = sanityClient({
//     projectID: 'rb4djj1g',
//     dataset: 'production',
//     apiVersion: '2022-03-10',
//     useCdn: true,
//     token: process.env.SANITY_API_KEY
// })

// const builder = ImageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'rb4djj1g',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.SANITY_API_KEY
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);