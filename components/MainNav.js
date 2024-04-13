import { Navbar, Nav, Container, Form, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from "@/lib/authenticate";



export default function MainNav() {
    const { register, handleSubmit } = useForm();
    const [historyList, setHistorylist] = useAtom(searchHistoryAtom)

    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false)

    let token = readToken();

    function logout() {
        removeToken();
        router.push("/");
    }
    async function submitForm(data, e) {
        e.preventDefault();
        const { searchField } = data;
        //console.log(searchField)

        //if searchfield empty don't search
        if (!searchField.trim()) {
            return;
        }
        setIsExpanded(false);
        setHistorylist(await addToHistory(`title=true&q=${searchField}`))
        router.push(`/artwork?title=true&q=${searchField}`);
    }

    const handleNavbarToggle = () => {

        setIsExpanded(!isExpanded);
    };

    const handleNavLinkClick = () => {

        setIsExpanded(false);
    };



    return (
        <>
            <Navbar
                key={router.pathname}
                expand="lg"
                className={`fixed-top navbar navbar-dark bg-dark ${isExpanded ? 'expanded' : ''}`}
            >
                <Container>
                    <Navbar.Brand>Abdirahman Osman</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link as="a" className={`navbar-link ${router.pathname === '/' ? 'active' : ''}`} onClick={handleNavLinkClick}>Home</Nav.Link>
                            </Link>
                            {token && (

                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link as="a" className={`navbar-link ${router.pathname === '/search' ? 'active' : ''}`} onClick={handleNavLinkClick}>Advanced Search</Nav.Link>
                                </Link>

                            )}
                        </Nav>
                        {token && (
                            <>

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
                            </>
                        )}

                        <Nav>
                            {token ? (
                                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === '/favourites'} onClick={handleNavLinkClick}>
                                            Favourites
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === '/history'} onClick={handleNavLinkClick}>
                                            History
                                        </NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav>
                                    <Link href="/register" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === '/register'} onClick={handleNavLinkClick}>Register</Nav.Link>
                                    </Link>
                                    <Link href="/login" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === '/login'} onClick={handleNavLinkClick}>Login</Nav.Link>
                                    </Link>
                                </Nav>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>






        </>
    );
}


