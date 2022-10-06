import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useMeQuery } from "../generated/graphql";

interface NavBarProps{

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery()
    let body = null;
    
    if(fetching) {
        body = null;
    } else if (!data?.me) {
        body = (
            <>
            <NextLink href="/login">
                <Link mr={2}>Login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link mr={2}>Register</Link>
            </NextLink>
            </>
        )
    } else {
        body = (
        <Flex>
          <Button mr={2} borderRadius={25}>{data.me.username.charAt(0).toUpperCase() + data.me.username.slice(1)}</Button>
          <Button borderRadius={25}>Logout</Button>
        </Flex>
        )
    }
    return (
        <Flex bg="steelblue" p={4}>
          <Box ml={'auto'}>
              {body}
          </Box>
        </Flex> 
    )
}