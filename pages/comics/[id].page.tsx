import { Box, Grid, Stack } from "@mui/material";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { IComic, IComicResponse } from "types/IComic.type";
import ComicDetailsInfo from "dh-marvel/components/comicDetailsInfo/comic-details";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
interface Props {
  comic: IComic;
}

const ComicDetailPage: NextPage<Props> = ({ comic }) => {
  const router = useRouter();
  if (router.isFallback === true) {
    return <p>Loading...</p>;
  }

  return (
    <LayoutGeneral>
   
      <Head>
        <title>{comic.title}</title>
        <meta
          name="description"
          content={`Comic ${comic.title}.${comic.series}`}
        />
      </Head>
      <Stack
        component="section"
        maxWidth="50%"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "100px 20px",
        }}
      >
        <Grid container spacing={4} maxWidth="xl">
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                
              }}
            >
              <Box
                component="img"
                alt={comic.title}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                sx={{
                  boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
                  margin: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ComicDetailsInfo comic={comic} />
          </Grid>
        </Grid>
      </Stack>
      </LayoutGeneral>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await getComic(Number(id));

  return {
    props: {
      comic: response,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicResponse = await getComics();

  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ComicDetailPage;