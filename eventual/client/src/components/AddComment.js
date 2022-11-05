import { useContext } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { EventContext } from './EventContext';

const AddComment = ({ addComment }) => {
    const {commentText, setCommentText} = useContext(EventContext);

    return (
        <Card className="eventCard">
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" style={{resize: 'none'}} rows={5} value={commentText} placeholder="Leave a comment..." onChange={(e) => setCommentText(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={addComment}>
                        Comment
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddComment