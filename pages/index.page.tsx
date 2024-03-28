
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import ComicGrid from "dh-marvel/components/comic/comicGrid";
import Pagination from 'dh-marvel/components/comic/pagination';
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
type Props = {
  initialComics: any[];
};

const Index: NextPage<Props> = ({ initialComics }) => {
  const [comics, setComics] = useState(initialComics);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const comicsPerPage = 12;

  useEffect(() => {
    const fetchComics = async () => {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * comicsPerPage;
        const data = await getComics(offset, comicsPerPage);
        if (data && data.data && data.data.results) {
          setComics(data.data.results);
        } else {
          console.error('No se pudieron obtener los cómics');
        }
      } catch (error) {
        console.error('Ocurrió un error al obtener los cómics', error);
      }
      setIsLoading(false);
    };

    fetchComics();
  }, [currentPage]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <LayoutGeneral>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodySingle title={"Comics"}>
        <ComicGrid comics={comics} />
        <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
      </BodySingle>
    </LayoutGeneral>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const initialComics = await getComics(0, 12);
  return {
    props: {
      initialComics,
    },
    revalidate: 60, // Re-generate the page every minute
  };
};

export default Index;