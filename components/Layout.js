const { Container } = require("react-bootstrap")

import MainNav from "./MainNav";

export default function Layout(props) {
    return (

        <>
            <MainNav />
            <br />
            <br />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />

        </>

    );
}
