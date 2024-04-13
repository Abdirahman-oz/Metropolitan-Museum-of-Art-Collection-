import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { ListGroup, Button, Card } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';


export default function Favourites() {
    const [historyList, setHistoryList] = useAtom(searchHistoryAtom);
    const router = useRouter();

    const historyClicked = (index) => {
        const searchQuery = historyList[index];
        console.log(historyList[index]);
        router.push(`/artwork?${searchQuery}`);
    };
    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // stop the event from trigging other events
        setHistoryList(await removeFromHistory(historyList[index])) 



    };

    return (
        <>

            {historyList.length == 0 &&
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for something else.
                    </Card.Body>
                </Card>
            }


              {historyList && historyList.map((item, index) => (
            <ListGroup as="ul" key={index}>
                <ListGroup.Item 
                    key={index} 
                    as="li"
                    className={`${styles.historyListItem} text-break `}
                    onClick={() => historyClicked(index)}
                    style={{ cursor: 'pointer' }}
                >
                    {item} <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                </ListGroup.Item>
            </ListGroup>
        ))}


        </>
    );
}
