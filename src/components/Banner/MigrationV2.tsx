import React from 'react'
import { Text, Flex, Box, ErrorIcon, Button } from '@crystals/uikit'
import Banner from './Banner'

const MigrationV2 = () => {
  return (
    <Banner
      id="v2-migration"
      title={
        <Flex alignItems="center">
          <ErrorIcon color="white" width="32px" mr="16px" />
          <Text color="white" fontSize="24px" bold>
            ACTION REQUIRED for all LP token holders
          </Text>
        </Flex>
      }
      defaultVisible={false}
    >
      <Box ml="48px">
        <Text color="warning" bold />
        <Text color="white" mb="16px">
          All LPs will be migrated to a new, upgraded contract, over several hours starting from now.
        </Text>
        <Button as="a" href="">
          Migrate Now
        </Button>
      </Box>
    </Banner>
  )
}

export default MigrationV2
