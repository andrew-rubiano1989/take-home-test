import { createStyles, Grid, Theme, withStyles } from "@material-ui/core";
import React from "react";
import { Header } from "../components/Header";
import { ImageList } from "../components/ImageList";
import { UploadModal } from "../components/UploadModal";

const styles = (theme: Theme) => createStyles({
  Home: {
      padding: theme.spacing(0),
      height: "calc(100vh - 48px)"
  }
});

interface HomeProps {
  classes: any;
}

const HomeRaw = (props: HomeProps) => {
  return (
    <Grid container direction="column" className={props.classes.Home} wrap="nowrap">
      <Grid item>
        <Header/>
      </Grid>
      <Grid item xs>
        <ImageList/>
      </Grid>
      <UploadModal/>
    </Grid>
  );
};

export const Home = withStyles(styles)(HomeRaw)