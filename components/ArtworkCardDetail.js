import useSWR from 'swr';
import Error from "next/error";
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState,useEffect } from 'react';
import { addToFavourites,removeFromFavourites } from '@/lib/userData';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error, isLoading } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  //const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  const [showAdded, setShowAdded] = useState(false)

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
}, [favouritesList, objectID])


  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <Error statusCode={404} />
  }
  if (!data) {
    return null;
  }

  async function handleAddToFavourites()
  {
      if (showAdded)
      {
          setFavouritesList(await removeFromFavourites(objectID));
          setShowAdded(false);
      } else
      {
          setFavouritesList(await addToFavourites(objectID));
          setShowAdded(true);
      }
  }

  
//console.log(favouritesList)
 // console.log(showAdded,favouritesList)

  return (
    <>
      <Card >
        {data.primaryImage ? <Card.Img variant="top" src={data.primaryImage} /> : ""}
        <Card.Body>
          <Card.Title> {data.title || "N/A"}</Card.Title>
          <Card.Text>
            <b> Date: </b> {data.objectDate || "N/A"}
            <br />
            <b>Classification: </b> {data.classification || "N/A"}
            <br />
            <b> Medium: </b> {data.medium || "N/A"}
            <br />
            <br />
            <b> Artist: </b> {data.artistDisplayName || "N/A"} {data.artistWikidata_URL ? <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> : ""}
            <br />
            <b> Credit Line: </b> {data.creditLine || "N/A"}
            <br />
            <b> Dimensions: </b> {data.dimensions || "N/A"}
          </Card.Text>
          <Button variant={showAdded ? `primary` : `outline-primary` }  onClick={handleAddToFavourites} > {showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>
        </Card.Body>
      </Card>

    </>
  );
}
