import { Button, CircularProgress, createStyles, Grid, Input, Modal, Theme, Typography, withStyles } from "@material-ui/core";
import React, { ChangeEvent } from "react"
import { connect } from "react-redux";
import { ImageActions } from "../redux/actions/images";
import { ModalActions } from "../redux/actions/modal";
import { StoreState } from "../redux/reducers";

const styles = (theme: Theme) => createStyles({
    modalBody: {
        background: theme.palette.common.white,
        width: "70%",
        maxWidth: "800px",
        position: "static",
        margin: "auto",
        marginTop: "20%",
        borderRadius: "8px",
        padding: "10px"
    }
});

interface UploadModalProps {
    open: boolean;
    classes: any;
    searchTerm: string;
}

interface UploadModalState {
    file: File | null,
    saving: boolean,
    error: boolean
}

const mapStateToProps = ((state: StoreState) => ({
    open: state.uploadModal.open,
    searchTerm: state.images.searchTerm
}))

class UploadModalRaw extends React.Component<UploadModalProps, UploadModalState> {
    constructor(props: UploadModalProps) {
        super(props)
        this.state = {
            file: null,
            saving: false,
            error: false
        }
    }

    uploadFile = () => {
        if(this.state.file) {
            this.setState({saving: true})
            ImageActions.uploadImage(this.state.file).then(() => {
                setTimeout(() => {
                    this.onClose();
                    this.setState({error: false, saving: false, file: null})
                    ImageActions.queryImages(this.props.searchTerm || "")
                }, 500)
            }).catch(() => {
                this.setState({error: true, saving: false})
            })
        }
    }

    handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            this.setState({file: event.target.files[0]})
        }
    }

    onClose = () => {
        ModalActions.closeUploadModal()
    }

    render() {
        const {classes} = this.props;
        const {saving, error} = this.state;

        return (
            <Modal open={this.props.open} onClose={this.onClose}>
                <Grid container direction="column" spacing={1} className={classes.modalBody}>
                    <Grid item>
                        <Input type="file" inputProps={{accept:"image/*"}} onChange={this.handleFileChange} fullWidth/>
                    </Grid>
                    {error && <Typography color="error">Something didn't go right. Try again</Typography>}
                    <Grid item>
                        <Button onClick={this.uploadFile}
                            fullWidth 
                            color="primary" 
                            variant="contained"
                            disabled={saving || !this.state.file}>
                                {saving ? <CircularProgress/> : 'Submit'}
                            </Button>
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

export const UploadModal = withStyles(styles)(connect(mapStateToProps, {})(UploadModalRaw))