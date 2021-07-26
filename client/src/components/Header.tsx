import { Button, createStyles, Grid, Input, Theme, withStyles } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
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
    openModalCallback: () => void;
}

export const HeaderRaw: React.FC<HeaderRawProps> = (props: HeaderRawProps) => {
    const handleSearchInput = debounce((value: string) => {
        ImageActions.queryImages(value);
    }, 400);

    const openUploadModal = useCallback(() => {
        if(props.openModalCallback) {
            props.openModalCallback();
        }
        else {
            ModalActions.openUploadModal();
        }
    }, []);

    const {classes} = props;

    return (
        <div className={classes.headerContainer}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Input id="searchField" fullWidth type="text" 
                        placeholder="Search for images" 
                        onChange={(event: any) => handleSearchInput(event.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                    <Button 
                        onClick={openUploadModal} 
                        color="primary" 
                        variant="contained" 
                        startIcon={<CloudUploadIcon />}>UPLOAD</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export const Header = withStyles(styles)(HeaderRaw)