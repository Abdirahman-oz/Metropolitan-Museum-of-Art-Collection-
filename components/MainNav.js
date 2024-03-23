import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';



export default function MainNav() {
    const { register, handleSubmit } = useForm();

    const router = useRouter();

    function submitForm(data, e) {
        e.preventDefault();
        const { searchField } = data;
        //console.log(searchField)

        //if searchfield empty don't search
        if (!searchField.trim()) {
            return;
        }
        router.push(`/artwork?title=true&q=${searchField}`);
    }


    return (
        <>
            <Navbar key={router.pathname} expand="lg" className='fixed-top  nnavbar navbar-dark bg-dark'  >
                <Container >
                    <Navbar.Brand>Abdirahman Osman</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link as="a" className={`navbar-link ${router.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link as="a" className={`navbar-link ${router.pathname === '/search' ? 'active' : ''}`}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                {...register('searchField')}


                            />
                            <Button variant="success" type='submit'>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>






        </>
    );
}


