import React from "react"
import { Container, Typography } from "@material-ui/core"
import BasicPlan from "./BasicPlan"
import useStyles from "./styles"

const Profile = () => {
    const classes = useStyles()
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" className={classes.title} color="primary">
                基本情報
            </Typography>
            <BasicPlan />
        </Container>
    )
}
export default Profile;