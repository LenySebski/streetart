/* eslint-disable react/prop-types */
import Link from 'next/link';
import React, { useState } from 'react';
import { ArtCardFull, ArtsNearby } from '../../components';
import { getArts, getArtDetails } from '../../services';
import styles from '../../styles/SingleArtPage.module.css';

export default function SingleArtPage({ art }) {
  return (
    <div className={styles.contentContainer}>
      <ArtCardFull art={art} />
      <ArtsNearby
        title={art.title}
        slug={art.slug}
        longitude={art.geolocation.longitude}
        latitude={art.geolocation.latitude}
      />
    </div>
  );
}
export async function getStaticProps({ params }) {
  const data = (await getArtDetails(params.slug)) || [];
  console.log({ data });
  return {
    props: { art: data },
  };
}

export async function getStaticPaths() {
  const arts = await getArts();
  console.log({ arts });
  return {
    paths: arts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
