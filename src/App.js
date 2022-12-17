// import { Fragment, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { Dashboard } from './components/dashboard/Dashboard';
// import { AsyncExample } from './AsyncExample';
// import { ModalExample } from './ModalExample';

export const App = () => {
    /*
    // Bootstrap Lookahead example
    const handleSelected = (selected) => {
        console.log(`FROM App.js => You selected: ${selected.label}`, selected);
    };

    return <AsyncExample handleSelected={handleSelected} />;
    */
    /* // Bootstrap Modal example
    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Show modal
            </Button>

    {/ * {show ? <ModalExample show={show} setShow={setShow} /> : ''} * /}
            <ModalExample show={show} setShow={setShow} />
    {/ * {show ? 'true' : 'false'} * /}
        </>
    ); */

    return <Dashboard />;
};

// export default App;
// crypto.randomUUID()
