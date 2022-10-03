import { Box, Flex, Link } from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import NextLink from 'next/link'

interface NavBarProps{

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    return (
        <Flex bg="steelblue" p={4}>
          <Box ml={'auto'}>
            <NextLink href="/login">
            <Link mr={2}>Login</Link>
            </NextLink>
            <NextLink href="/register">
            <Link mr={2}>Register</Link>
            </NextLink>
            <DarkModeSwitch />
          </Box>
        </Flex> 
    )
}