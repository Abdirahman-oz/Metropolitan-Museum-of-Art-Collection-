import { useAtom } from 'jotai';
import { favouritesAtom} from '@/store';
import { useEffect, useState } from 'react';

import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

const PER_PAGE = 12;


export default function Favourites()
{
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    
    if(!favouritesList) return null;
    if (favouritesList)
    {
        return (
          <>
            <Row className="gy-4">
              {favouritesList.length > 0 ? (
                favouritesList.map((art) => {
                  return (
                    <Col lg={3} key={art}>
                      <ArtworkCard objectID={art} />
                    </Col>
                  );
                })
              ) : (
                <Card>
                  <p>
                    <br />
                    <h4>Nothing Here</h4>
                    Try adding new artwork to the list.
                  </p>
                </Card>
              )}
            </Row>
          </>
        );
    } else
    {
        return(null)   
    }
}