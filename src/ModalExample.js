import { Modal } from 'react-bootstrap';

export const ModalExample = ({ show, setShow, test }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Custom Modal Styling</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{test}</p>
                <p>
                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet
                    quae unde commodi aspernatur enim, consectetur. Cumque
                    deleniti temporibus ipsam atque a dolores quisquam quisquam
                    adipisci possimus laboriosam. Quibusdam facilis doloribus
                    debitis! Sit quasi quod accusamus eos quod. Ab quos
                    consequuntur eaque quo rem! Mollitia reiciendis porro quo
                    magni incidunt dolore amet atque facilis ipsum deleniti rem!
                </p>
            </Modal.Body>
        </Modal>
    );
};
