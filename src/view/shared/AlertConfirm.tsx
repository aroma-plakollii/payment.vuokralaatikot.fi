import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IAlertConfirmProps {
    title: string,
    message: string
    id: any;
    isOpen: boolean;
    onClose: (confirm: any) => void;
}

const AlertConfirm = (props: IAlertConfirmProps) => {

    return (
        <Modal show={props.isOpen} onHide={() => props.onClose('cancel')}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClose('cancel')}>
                    Cancel
                </Button>
                <Button className={'request-btn'} onClick={() => props.onClose('confirm')}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertConfirm