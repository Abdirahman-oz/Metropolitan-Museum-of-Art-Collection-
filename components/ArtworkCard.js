import useSWR from 'swr';
import Error from "next/error";
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
  const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <Error statusCode={404} />
  }
  if (!data) {
    return null;
  }

  //if no id 
  if (!data.objectID) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Card>
        <Card.Img variant="top" src={data.primaryImageSmall || `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`} />
        <Card.Body>
          <Card.Title> {data.title || "N/A"}</Card.Title>
          <Card.Text>
            <b> Date: </b> {data.objectDate || "N/A"}
            <br />
            <b>Classification: </b> {data.classification || "N/A"}
            <br />
            <b> Medium: </b> {data.medium || "N/A"}
          </Card.Text>
          <Link href={`/artwork/${data.objectID}`} passHref >
            <Button variant="btn btn-outline-dark"><b> ID: </b>{data.objectID}</Button>
          </Link>

        </Card.Body>
      </Card>
    </>
  );
}
