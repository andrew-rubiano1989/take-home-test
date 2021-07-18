import { Button, createStyles, Grid, Input, Theme, withStyles } from "@material-ui/core";
import React from "react";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ModalActions } from "../redux/actions/modal";
import {debounce} from 'debounce';
import { ImageActions } from "../redux/actions/images";

const styles = (theme: Theme) => createStyles({
    buttonContainer: {
        textAlign: "right"
    },
    headerContainer: {
        borderBottom: `1px solid ${theme.palette.common.black}`,
        padding: theme.spacing(3)
    }
});

interface HeaderRawProps {
    classes: any;
}

export class HeaderRaw extends React.Component<HeaderRawProps> {
    handleSearchInput = debounce((value: string) => {
        ImageActions.queryImages(value);
    }, 400);

    openUploadModal = () => {
        ModalActions.openUploadModal();
    }

    handleModalClose = () => {
        ModalActions.closeUploadModal();
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.headerContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Input fullWidth type="text" 
                            placeholder="Seach for images" 
                            onChange={(event: any) => this.handleSearchInput(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                        <Button 
                            onClick={this.openUploadModal} 
                            color="primary" 
                            variant="contained" 
                            startIcon={<CloudUploadIcon />}>UPLOAD</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export const Header = withStyles(styles)(HeaderRaw)