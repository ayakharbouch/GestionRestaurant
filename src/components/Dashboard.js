import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);

    };

    return (
        <div>
            <AppBar position="static" sx={styles.appBar}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={styles.title}>
                            My Resto
                        </Typography>
                        <Box sx={styles.navLinks}>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to=""
                                sx={{
                                    ...styles.link,
                                    color: activeLink === '' ? '#FFA500' : '#FFFFFF',
                                }}
                                onClick={() => handleLinkClick('')}
                            >
                                City
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/Z"
                                sx={{
                                    ...styles.link,
                                    color: activeLink === '/Z' ? '#FFA500' : '#FFFFFF',
                                }}
                                onClick={() => handleLinkClick('/Z')}
                            >
                                Zone
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/serie"
                                sx={{
                                    ...styles.link,
                                    color: activeLink === '/serie' ? '#FFA500' : '#FFFFFF',
                                }}
                                onClick={() => handleLinkClick('/serie')}
                            >
                                Serie
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/spec"
                                sx={{
                                    ...styles.link,
                                    color: activeLink === '/spec' ? '#FFA500' : '#FFFFFF',
                                }}
                                onClick={() => handleLinkClick('/spec')}
                            >
                                Specialite
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/resto"
                                sx={{
                                    ...styles.link,
                                    color: activeLink === '/resto' ? '#FFA500' : '#FFFFFF',
                                }}
                                onClick={() => handleLinkClick('/resto')}
                            >
                                Restaurant
                            </Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Content */}

        </div>
    );
};

const styles = {
    appBar: {
        backgroundColor: '#000000',
    },
    title: {
        flexGrow: 1,
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    link: {
        cursor: 'pointer',
        '&:hover': {
            color: '#FFA500',
        },
    },
    content: {
        marginTop: '40px',
    },
};

export default Dashboard;
