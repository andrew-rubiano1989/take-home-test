import { Theme, createStyles, withStyles, Grid } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { ImageActions } from "../redux/actions/images";
import { StoreState } from "../redux/reducers";

const styles = (theme: Theme) => createStyles({
    imagesContainer: {
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: theme.spacing(3),
        height: "100%"
    },
    countContainer: {
        fontSize: "1rem",
        fontWeight: "bold",
        marginBottom: "10px"
    },
    image: {
        minHeight: "200px",
        minWidth: "300px",
        display: "flex",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "norepeat",
        position: "relative"
    },
    closeButton: {
        fontSize: "1.5rem",
        background: theme.palette.common.black,
        borderRadius: "50%",
        padding: "5px",
        top: "10px",
        right: "10px",
        position: "absolute",
        cursor: "pointer"
    }
});

interface ImageListProps {
    images: string[];
    searchTerm: string;
    classes: any;
}

const mapStateToProps = ((state: StoreState) => ({
    images: state.images.images,
    searchTerm: state.images.searchTerm
}))

class ImageListRaw extends React.Component<ImageListProps> {
    componentDidMount() {
        ImageActions.loadImages();
    }

    handleDeleteImage = (filePath: string) => () => {
        ImageActions.deleteImage(filePath.split('/images/')[1]).then(() => {
            ImageActions.queryImages(this.props.searchTerm || "");
        })
    }

    render() {
        const {classes, images} = this.props;

        return (
            <div className={classes.imagesContainer}>
                <div className={classes.countContainer}>{images.length} Image{images.length > 1 ? 's' : ''}</div>
                <Grid container spacing={3}>
                    {images.map((file: string) => {
                        return (
                            <Grid item key={file} xs={12} sm={6} md={4} lg={3}>
                                <div style={{backgroundImage: `url(${`http://localhost:3001${file}`})`}} className={classes.image}>
                                    <CloseRounded onClick={this.handleDeleteImage(file)} className={classes.closeButton}/>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

export const ImageList = withStyles(styles)(connect(mapStateToProps, {})(ImageListRaw))