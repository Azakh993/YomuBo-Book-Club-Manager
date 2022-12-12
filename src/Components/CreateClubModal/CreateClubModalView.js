import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateClubModalStyle.css";

export default function CreateClubModalView(){
    return(<>
        {/*Button trigger modal*/}
        <Button type="button" class="btn btn-primary create-club-button" id="create-club-button" data-bs-toggle="modal" data-bs-target="#createClubModal">
            Create new club
        </Button>

        {/*Modal*/}
        <div class="modal fade" id="createClubModal" tabindex="-1" aria-labelledby="createClubModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header head-footer-modal">
                        <h5 class="modal-title" id="createClubModalLabel">Create club</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Form>
                            <Form.Group className={"m-2"} controlId="formText">
                                <Form.Label>Club name</Form.Label>
                                <Form.Control type="text" placeholder="Enter club name" />
                            </Form.Group>
                            <Form.Group className={"m-2"} controlId="formText">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter max capacity" />
                            </Form.Group>
                        </Form>
                    </div>
                    <div class="modal-footer head-footer-modal">
                        <Button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</Button>
                        <Button type="button" class="btn btn-primary create-club-button">Create club</Button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
