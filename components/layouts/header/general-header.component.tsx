import * as React from 'react';
import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {Link as MUILink} from '@mui/material';

export type Props = {
    variant?: "simple" | "general"
}

const Header: FC<Props> = ({variant}: Props) => {
    return <Container maxWidth="xl">
        <Toolbar disableGutters>            
            <MUILink href="/" variant="h6" sx={{
                mr: 2,
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
            }}>DH-Marvel</MUILink>
            {variant == 'general' &&
                <Box>
                    <MUILink href="/" variant="body2" sx={{color: 'white', fontSize: 18, fontWeight: 600}}>FAQ</MUILink>
                </Box>
            }
        </Toolbar>
    </Container>
}


const GeneralHeader: FC<Props> = ({variant}: Props) => {
    return variant == 'general' ?
        <AppBar position="static">
            <Header variant={variant}/>
        </AppBar> : <Header variant={variant}/>
        ;
};
GeneralHeader.defaultProps = {
    variant: 'general'
}

export default GeneralHeader;
