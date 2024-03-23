import { useRouter } from 'next/router';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { Row, Col } from 'react-bootstrap';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={id} />
        </Col>
      </Row>

    </>
  )


}